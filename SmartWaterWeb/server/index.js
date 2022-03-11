const dayjs = require('dayjs');
const express = require('express')
const app = express()
const port = 3000
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.mqttdashboard.com')

// getting-started.js
const mongoose = require('mongoose');

//main().catch(err => console.log(err));

//async function main() {
try{
mongoose.connect('mongodb+srv://6317700001:mutacth@waterdb.e39wv.mongodb.net/waterDatas?retryWrites=true&w=majority');
const hardwareId = mongoose.model('hardwareData', { id: String });
const waterValue = mongoose.model('WaterUsage', {id: String ,total_water: Number , total_usage: Number ,timestamp: Number});

client.on('connect', function () {
  client.subscribe('watervalue/1', function (err) {
    if (!err) {
      
    }
  })
  client.subscribe('hwid/1', function (err) {
    if (!err) {

    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  if(topic == 'watervalue/1'){
    //JSON PART 
    const jsonck = JSON.parse(message);
    //console.log(jsonck);
    const wvalue = new waterValue({ id: jsonck.id, total_water:jsonck.total_water ,total_usage: jsonck.total_usage, timestamp: dayjs().unix()});
    /*console.log(dayjs().startOf('week').format('ddd DD/MM/YYYY'));
    console.log(dayjs().endOf('week').format('ddd DD/MM/YYYY'));
    console.log(dayjs().subtract(1, 'week').startOf('week').format('ddd DD/MM/YYYY'));*/
    console.log(wvalue);
    wvalue.save();
  }
  if(topic == 'hwid/1'){
    const hid = new hardwareId({ id: message.toString()});
    hid.save(); //change to uuid 
  }
  //console.log(topic, message);
  console.log(message.toString())
})

//Get week Data
app.get('/', async(req, res) => {
  //const kitty = new Cat({ name: 'Zildjian' });
  //kitty.save().then(() => console.log('meow'));
  //res.send('Bello World!')
  const [targetData] = await waterValue.find({timestamp : {$gte: dayjs().endOf('week').startOf('day').unix(), $lt: dayjs().endOf('week').endOf('day').unix()}}).sort({total_usage : -1}).limit(1);
  console.log(targetData.total_usage);
  res.send(targetData);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
}
catch(err){
  console.log(err)
}

//}
