import mysql from "mysql2"
import { service_account } from "../service_account.js"

export function getTransactions(req, res) {
    //console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_account)
    db.query(`SELECT * FROM transactions`, (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
        }
       // console.log(results)
        res.send(results)
    })
}

// send in body as the arguement
// {
//     "where":"amount > 20 && amount < 100"

// }
export function queryTransactions(req, res) {
    //console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_account)
    db.query(`SELECT * FROM transactions WHERE ${req.body.where}`, (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
        }
       // console.log(results)
        res.send(results)
    })
}

// send in body as the arguement
// {
//     "where":"transID = 114323423"
//      "set": "amount=43.23"
// }
export function updateTransactions(req, res) {
    //console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_account)
    db.query(`UPDATE transactions SET ${req.body.set} WHERE ${req.body.where}`, (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
        }
       // console.log(results)
        res.send(results)
    })
}

// const transaction = {
//     transID: "",
//     userID: "143235453523", 
//     childID: "1243235",
//     title: "Something R US", 
//     amount: 4332435
// }

export function postTransactions(req, res) {
    
    const transaction = req.body
    transaction.transID= Date.now().toString()
    console.log(transaction)
    const db = mysql.createConnection(service_account)
    db.query(`insert into transactions (transID, userID, childID, title, amount) 
    values('${transaction.transID}', '${transaction.userID}', '${transaction.childID}', '${transaction.title}', '${transaction.amount}');`
    , (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
        }
       // console.log(results)
        res.send(results)
    })
}