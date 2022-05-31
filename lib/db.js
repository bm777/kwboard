var mysql      = require('mysql');
import { host, port, database, user, password } from './constant';

export function con(){
    var connection = mysql.createConnection({
        host     : host,
        user     : user,
        password : password,
        database : database
      });
      
    //   connection.connect(function(err) {
    //       if (err) {
    //         return console.error('error: ' + err.message);
    //       }
    //       console.log('MySQL Connection Successful.');
    //     });
    
        return connection;
      
}
// connection.query('SELECT * FROM Airport.planes', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// connection.end();
