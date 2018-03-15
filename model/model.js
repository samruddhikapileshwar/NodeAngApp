var mysql = require('mysql');

class Model {

    constructor() {
        this.pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "root",
            database: "nodeang", //schema 
            connectionLimit: 20 // at a time 20 connection be created in pool
        });
    };

    getData() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, con) {
                if (err) {
                    return reject(err);
                } else {
                    con.query("select * from calculation order by ID desc limit 0,1", function(err, rows) {
                        if (err) {
                            return reject(err);
                        } else {
                            con.release(); // releasing connection to pool
                            return resolve(rows);
                        }
                    });
                }
            }); // getConnection
        }); // fn
    };

    saveData(paramOne, paramTwo) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, con) {
                if (err) {
                    return reject(err);
                } else {
                    con.query("insert into calculation(PARAM_ONE,PARAM_TWO,RESULT) values(" + paramOne + "," + paramTwo + "," + paramOne * paramTwo + ")", function(err, result) {
                        if (err) {
                            return reject(err);
                        } else {
                            con.release(); // releasing connection to pool
                            return resolve(result);
                        }
                    });
                }
            }); // getConnection
        }); // fn
    };
}

module.exports = Model;