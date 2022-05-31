// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


var mysql      = require('mysql');
import { host, database, user, password } from '../../lib/constant';

var connection = mysql.createConnection({
  host     : host,
  user     : user,
  password : password,
  database : database
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    // console.log('MySQL Connection Successful.');
  });


export default function handler(req, res) {
  const db = req.query.db
  const user_query = 'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA="'+db+'"';
  
  connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ tables: result})
  })
  // connection.end()
}