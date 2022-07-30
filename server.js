const mysql = require('mysql')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
app.set('view engine', 'ejs')


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "particleX"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query('use mydb;', (err, res)=>{
    console.log(res)
})

// con.query('show tables;', (err, res)=>{
//     console.log(res)
// })

app.use(express.static('scripts'))

app.get('/', (req, res)=>{
    res.render('home')
})
app.get('/stationschedule', (req, res)=>{
    res.render('station_schedule')
})
app.get('/trainschedule', (req, res)=>{
    res.render('train_schedule')
})
app.get('/trainbwstations', (req, res)=>{
    res.render('train_between_stations')
})
app.get('/live', (req, res)=>{
    res.render('live')
})


app.get('/alltrains', (req, res)=>{
    con.query('select train_name from train;', (err, data)=>{
        console.log(data)
        res.json(data)
    })
})

app.get('/allstations', (req, res)=>{
    con.query('select station_name from station;', (err, data)=>{
        console.log(data)
        console.log(err)
        res.json(data)
    })
})

app.get('/trainschedule/:trainname', (req, res)=>{
    con.query(`select train_no from train where train_name = '${req.params.trainname}'`, (err, trainno)=>{
        console.log(err)
        // console.log(trainno[0]['train_no'])
        con.query(`call all_train_stops(${trainno[0]['train_no']});`, (err, data)=>{
            console.log(err)
            console.log(data)
            res.json(data[0])
        })

    })
})
app.get('/stationschedule/:stationname', (req, res)=>{
    con.query(`select station_no from station where station_name = '${req.params.stationname}'`, (err, stationno)=>{
        console.log(err)
        console.log("here")
        console.log(`call station_schedule('${stationno[0]['station_no']}');`)
        // console.log(stationno[0]['station_no'])
        con.query(`call station_schedule('${stationno[0]['station_no']}');`, (err, data)=>{
            console.log(err)
            console.log(data)
            res.json(data[0])
        })

    })
})
app.get('/trainstatus/:trainname', (req, res)=>{
    con.query(`select train_no from train where train_name = '${req.params.trainname}'`, (err, trainno)=>{
        console.log(err)
        // console.log(trainno[0]['train_no'])
        con.query(`call train_status(${trainno[0]['train_no']});`, (err, data)=>{
            console.log(err)
            console.log(data)
            res.json(data[0])
        })

    })
})

app.get('/trainsbw/:stationname1/:stationname2', (req, res)=>{
    var stationno1 = ""
    var stationno2 = ""
    con.query(`select station_no from station where station_name = '${req.params.stationname1}' or station_name = '${req.params.stationname2}'`, (err, stationno)=>{
        console.log(err)
        console.log("here")
        // console.log(stationno)
        // console.log(stationno[0]['station_no'])
        con.query(`call available_trains('${stationno[0]['station_no']}', '${stationno[1]['station_no']}');`, (err, data)=>{
            console.log(err)
            console.log(data)
            res.json(data[0])
        })

    })
})

server.listen(80)