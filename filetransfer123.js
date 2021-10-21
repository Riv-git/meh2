const express = require ('express');
var path = require('path');
const pool = require('./config_database.js');
const bodyParser = require("body-parser");
const { send } = require('process');

let router = express.Router();
router.use(express.static(__dirname + '/front'));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

 // or var Router = 
router. //thisname is already placed on the module
post('',(req , res)=>{
    let tablename = pool.escape(req.body.name);
    tablename = tablename.replace("'", "");
    tablename = tablename.replace("'", "");
    
    let possibleinstruction = `create table if not exists  ${tablename}(
        id int primary key auto_increment,
        title varchar(255)not null,
        completed tinyint(1) not null default 0
    )`;
    
    pool.query(possibleinstruction, function (error, results, fields) {
    if (error) throw error;
    
    });
    console.log(req.body); 
    res.json({ user: 'router' });
})


module.exports = router;
