const express = require('express');
const app = express();


const db = require('./config/mongoose');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('Server is up and running at port 8000');
})

app.use('/api', require('./routes/route'))



app.listen(8000, (err) => {
    if(err) {
        console.log('error: ', err);
        return;
    }
    console.log('Server is running at port 8000');
})