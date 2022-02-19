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
mongoose.connect('mongodb+srv://6317700001:mutacth@waterdb.e39wv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const hardwareId = mongoose.model('hardwareData', { id: String });
const waterValue = mongoose.model('WaterValue', {id: String ,value: Number, timestamp: String});

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
    console.log(jsonck);
    const wvalue = new waterValue({ id: jsonck.id ,value: jsonck.total_usage, timestamp: dayjs().format('ddd DD/MM/YYYY')});
    /*console.log(dayjs().startOf('week').format('ddd DD/MM/YYYY'));
    console.log(dayjs().endOf('week').format('ddd DD/MM/YYYY'));
    console.log(dayjs().subtract(1, 'week').startOf('week').format('ddd DD/MM/YYYY'));*/
    wvalue.save();
  }
  if(topic == 'hwid/1'){
    const hid = new hardwareId({ id: message.toString()});
    hid.save(); //change to uuid 
  }
  //console.log(topic, message);
  console.log(message.toString())
})

app.get('/', (req, res) => {
  const kitty = new Cat({ name: 'Zildjian' });
  //kitty.save().then(() => console.log('meow'));
  res.send('Bello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
}
catch(err){
  console.log(err)
}

//}
//////
