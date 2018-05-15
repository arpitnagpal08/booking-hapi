const mysql = require('mysql'); 
global.con =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'729148@n'
});
let connection= async function(){ 
 try {
   await con.connect() ; 
   await con.query(`create database if not exists expressdb`);
   await con.query(`use expressdb`);
   
   //Auto register 2 super admin
   
 } catch (error) {
     console.log("connect database");
 }
    
}
module.exports = connection;