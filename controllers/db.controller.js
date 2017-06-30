/**
 * MySQL connection
 * @see      https://www.npmjs.com/package/mysql
 * @since    July 2017
 */

// MySQL credentials
var mysql = require('mysql');

// Used to create connection
var connectionObject = {
    connectionLimit: 20,
    database: process.env.DB_NAME || 'rsvpday',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    migrate: true,
    multipleStatements: true,
    dateStrings: true
};

pool = mysql.createPool(connectionObject);

var connect = function(callback) {

    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('System error: ' + err);
        }

        return callback(connection);
    });
    
};

/**
 * Executes a query
 * @param query (String): MySQL query (SELECT, UPDATE, etc.);
 * @param callback (function)
 */
var execute = function(query, callback) {
    connect(function(connection) {
        connection.query(query, function(err, res) {
            if (err) {
                console.log('System error: ' + err);
            }

            connection.release();
            return callback(res);
        });
    });
};

/**
 * Execute an insertion
 * @param input (Object): Table name and list of fields to insert
 * @param callback (function)
 */
var insert = function(input, callback) {
    connect(function(connection) {
        connection.query("INSERT INTO `" + input.table + "` SET ?", input.fields, function(err, res) {
            if (err) {
                console.log('System error: ' + err);
            }

            connection.release();
            return callback(res);
        });
    });
};

/**
 * Inserts a list of objects
 * 
 * @param input (Array<Object>): The list to be inserted, all with table and fields
 * @param table (String): The name of the destination table
 * @param callback (Function): The function to be executed afterwards
 * @param isTransaction (Boolean): A boolean to specify if this is part of a transaction
 * @param transConnection (Connection Object): The connection object in case that this is a transaction
 *
 * @return callback (function)
 */
var batchInsert = function(input, table, callback, isTransaction, transConnection) {
    if (input.length > 0) {
        var queries = '';
        queries += 'INSERT INTO ';
        queries += '`' + table + '`';
        queries += ' (';

        // Loop through the first element's keys to set the columns
        Object.getOwnPropertyNames(input[0]).forEach(function(val, idx, array) {
            
            var props = array.length;
            queries += '`' + val + '`';
            if (idx + 1 < props) { 
                queries += ', '; 
            }
        });
        queries += ')';
        queries += ' VALUES ';

        // Loop through all the elements to get the insertion values
        for (var i = 0; i < input.length; i++) {
            var totalInputs = input.length;
            queries += '(';
            // Get the element's values
            Object.getOwnPropertyNames(input[i]).forEach(function(val, idx, array) {
                var props = array.length;
                queries += "'" + input[i][val] + "'";
                if (idx + 1 < props) { 
                    queries += ','; 
                }
            });
            queries += ')';

            if (i + 1 < totalInputs) { 
                queries += ','; 
            } else { 
                queries += ';'; 
            }
        };
        
        // If it's a transaction, we don't need to connect again
        if (isTransaction !== undefined && isTransaction) {
            executeQuery(queries, callback, isTransaction, transConnection);
        } else {
            connect(function(connection) {
                executeQuery(queries, callback, isTransaction, connection);
            });
        }
        
    } else {
        return false;
    }
};

/**
 * Updates one field in a list of objects
 * 
 * @param input (Array<Object>): The list to be inserted, all with table and fields
 * @param table (String): The name of the destination table
 * @param fieldToUpdate (String): The name of the field we are updating
 * @param key (String): The name of the key we are using to identify the records we are updating
 * @param callback (Function): The function to be executed afterwards
 * @param isTransaction (Boolean): A boolean to specify if this is part of a transaction
 * @param transConnection (Connection Object): The connection object in case that this is a transaction
 *
 * @return callback (function)
 */
var batchUpdateOneField = function(input, table, fieldToUpdate, key, callback, isTransaction, transConnection) {
    if (input.length > 0) {
        var queries = '';
        queries += 'UPDATE ';
        queries += '`' + table + '`';
        queries += ' SET `' + fieldToUpdate + '` = (CASE `' + key + '`';

        var afterWhere = '';

        //Object.getOwnPropertyNames(input[0]).forEach(function(val, idx, array) {
        for (i = 0; i < input.length; i++) {
            
            //var props = array.length;
            var objectToUpdate = input[i];
            var fieldToUpdateValue = objectToUpdate[fieldToUpdate];
            var keyValue = objectToUpdate[key];
            queries += ' WHEN \'' + keyValue + '\' THEN \'' + fieldToUpdateValue.toString() + '\'';

            afterWhere += keyValue.toString();
            if (i + 1 < input.length) { 
                afterWhere += ', ';
            }
        }
        //});
        queries += ' END)';
        queries += ' WHERE `' + key + '` IN (' + afterWhere +');';
        
        // If it's a transaction, we don't need to connect again
        if (isTransaction !== undefined && isTransaction) {
            executeQuery(queries, callback, isTransaction, transConnection);
        } else {
            connect(function(connection) {
                executeQuery(queries, callback, isTransaction, connection);
            });
        }
        
    } else {
        return false;
    }
};

/**
 * Transaction to rollback changes
 * @param callback (function)
 */
var beginTransaction = function(callback) {
    connect(function(connection) {
        connection.beginTransaction(function(err) {
            if (err) { 
                throw err; 
            }
            
            callback(connection);
        });
    });
};

function executeQuery(queries, callback, isTransaction, connection) {
    connection.query(queries, function(err, res) {

        if (err) {
            console.log('System error: ' + err);
            
            if (isTransaction) {
                connection.rollback();
            }
        }
        if (!isTransaction) {
            connection.release();
        }
        
        callback(res);
    })
};

module.exports = {
    "execute": execute,
    "insert": insert,
    "batchInsert": batchInsert,
    "batchUpdateOneField": batchUpdateOneField,
    "beginTransaction": beginTransaction,
    "connection": pool
};