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

// http://localhost:3000/api/data?table=planes
export default function handler(req, res) {
  const table_name =req.query.table

  const user_query = 'SELECT * FROM '+table_name;
  
  connection.query(user_query, function (error, result, fields){
      if (error) throw error;
      res.status(200).json({ data: result})
  })
  // connection.end()
}