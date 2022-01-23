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
mongoose.connect('mongodb+srv://6317700001:mutacth@watervalue.e39wv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const hardwareId = mongoose.model('hardwareData', { id: String });
const waterValue = mongoose.model('WaterValue', { value: String, timestamp: String});
//}
//////
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
    const wvalue = new waterValue({ value: message.toString(), timestamp: dayjs().format('DD/MM/YYYY')});
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