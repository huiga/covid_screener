const express = require('express');
const connection = require('../config/database');
const app = express();


// Get all test results for specific employee
app.get('/for', (req, res) => {
    if (req.session.loggedin){
        const SELECT_RESULTS_QUERY = 'SELECT E.collectionTime, W.result \
        FROM EmployeeTest E, PoolMap P, WellTesting W \
        WHERE E.testBarcode = P.testBarcode AND P.poolBarcode = W.poolBarcode AND E.employeeID = ?';
        connection.query(SELECT_RESULTS_QUERY, [req.session.user], (err, result) => {
            if (err) {
                res.send(null)
            } else {
                console.log('Employee results', result)
                res.send(result)
            }
        })
    } else {
        res.send(null)
    }
    
});

// Get all tests collected from the DB
app.get('/all', (req, res) => {
    if (req.session.loggedin) {
        const SELECT_RESULTS_QUERY = 'SELECT * FROM EmployeeTest';
        connection.query(SELECT_RESULTS_QUERY, [req.session.user], (err, result) => {
            if (err) {
                res.send(null)
            } else {
                console.log('Collection results', result)
                res.send(result)
            }
        })
    } else {
        res.send(null)
    }
});

// Adds new test under user with labID
app.post('/add', (req, res) => {
    if(req.session.loggedin){ 
        const ADD_TEST_QUERY = 'INSERT INTO EmployeeTest VALUES (?, ?, ?, ?)';
        connection.query(ADD_TEST_QUERY, [req.body.testBarcode, req.body.employeeID, 
            req.body.collectionTime, req.body.collectedBy], (err, result) => {
            if(err) {
                res.send(null)
            } else {
                res.send(result)
            }
        })
    } else {
        res.send(null)
    }
})


// Removes a test with employeeID and testBarcode
app.delete('/delete', (req, res) => {    
    console.log('loggedin', req.body.testsToDelete)
    const tests = req.body.testsToDelete;
    var TESTS_QUERY = ``;
    for (var i = 0; i < tests.length; i++) {
        TESTS_QUERY += `"${tests[i]}",`;
    }
    TESTS_QUERY = TESTS_QUERY.slice(0,-1);
    const DELETE_TEST_QUERY = `DELETE FROM EmployeeTest WHERE (testBarcode) IN (${TESTS_QUERY})`;
    connection.query(DELETE_TEST_QUERY, (err, result) => {
        if(err) {
            console.log(err)
            res.send(null)
        } else {
            // console.log('DELETED', result)
            res.send(result)
        }
    })
})



module.exports = app;