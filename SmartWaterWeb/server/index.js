const dayjs = require('dayjs');
const express = require('express')
const moment = require('moment')
const app = express()
const port = 5000
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.mqttdashboard.com')
const cors = require('cors');

app.use(cors());

// getting-started.js
const mongoose = require('mongoose');

//Filter data
const addConvertUnixToDate = {
  $addFields: {
    ISOtimestamp: { $toDate: { $multiply: ["$timestamp", 1000] } },
  }
};

const addWeekOfmonthField = {
  $addFields: {
    weekOfMonth: { $floor: { $divide: [{ $dayOfMonth: "$ISOtimestamp" }, 7] } }

  }
}

const FilterSelectedMonth = (monthId) => {
  return {
    $match: {
      $expr: {
        $and: [
          { $eq: [{ $month: "$ISOtimestamp" }, +monthId] },
          { $eq: [{ $year: "$ISOtimestamp" }, 2022] }
        ],
      },
    }
  }
}

const maxUsagePerWeekInMonth = {
  $group: {
    _id: "$weekOfMonth",
    maxUsage: { $max: "$total_usage" }
  }
}

const addMonthofYearField = {
  $addFields: {
    monthOnYear: { $month: "$ISOtimestamp"}
  }
}

const maxUsagePerMonth = {
  $group: {
    _id: "$monthOnYear",
    maxUsage: { $max: "$total_usage" }
  }
}

const FilterSelectedYear = (YearId) => {
  return {
    $match: {
      $expr: {
        $and: [
          { $eq: [{ $year: "$ISOtimestamp" }, +YearId] }
        ],
      },
    }
  }
}


//main().catch(err => console.log(err));

//async function main() {
try {
  mongoose.connect('mongodb+srv://6317700001:mutacth@waterdb.e39wv.mongodb.net/waterDatas?retryWrites=true&w=majority');
  const hardwareId = mongoose.model('hardwareData', { id: String });
  const waterValue = mongoose.model('WaterUsage', { id: String, total_water: Number, total_usage: Number, timestamp: Number });

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
    if (topic == 'watervalue/1') {
      //JSON PART 
      const jsonck = JSON.parse(message);
      //console.log(jsonck);
      const wvalue = new waterValue({ id: jsonck.id, total_water: jsonck.total_water, total_usage: jsonck.total_usage, timestamp: dayjs().unix() });
      /*console.log(dayjs().startOf('week').format('ddd DD/MM/YYYY'));
      console.log(dayjs().endOf('week').format('ddd DD/MM/YYYY'));
      console.log(dayjs().subtract(1, 'week').startOf('week').format('ddd DD/MM/YYYY'));*/
      console.log(wvalue);
      wvalue.save();
    }
    if (topic == 'hwid/1') {
      const hid = new hardwareId({ id: message.toString() });
      hid.save(); //change to uuid 
    }
    //console.log(topic, message);
    console.log(message.toString())
  })

  //Get week Data
  app.get('/week/:monthid', async (req, res) => {
    //const kitty = new Cat({ name: 'Zildjian' });
    //kitty.save().then(() => console.log('meow'));
    //res.send('Bello World!')
    console.log(req.params.monthid);
    const targetData = await waterValue.aggregate([
      addConvertUnixToDate,
      addWeekOfmonthField,
      FilterSelectedMonth(req.params.monthid),
      maxUsagePerWeekInMonth
      
    ]).sort("_id");
    console.log(targetData);
    res.send(targetData);
  })

  app.get('/month/:yearid', async (req, res) => {
    //const kitty = new Cat({ name: 'Zildjian' });
    //kitty.save().then(() => console.log('meow'));
    //res.send('Bello World!')
    console.log(req.params.yearid);
    const targetData = await waterValue.aggregate([
      addConvertUnixToDate,
      addMonthofYearField,
      FilterSelectedYear(req.params.yearid),
      maxUsagePerMonth
      
    ]).sort("_id");
    console.log(targetData);
    res.send(targetData);
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
catch (err) {
  console.log(err)
}

//var LAST_MONDAY = moment.unix(1646067600).unix();
//var Last_Sun = moment.unix(1646067600).add(7, 'days').unix();

//}





/*.find(
 {
   timestamp: {
       $gte: LAST_MONDAY, 
       $lt: Last_Sun
   }
 }
).sort("-timestamp");*/