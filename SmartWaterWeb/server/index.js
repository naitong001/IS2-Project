const express = require('express')
const app = express()
const port = 3000
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')

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
  console.log(message.toString())
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})