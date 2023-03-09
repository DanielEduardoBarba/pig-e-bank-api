import mysql from "mysql2"
import { service_account } from "../service_account.js"

export function findPin(req, res) {
    console.log(req.params)
    const db = mysql.createConnection(service_account)
    db.query(`SELECT * FROM users WHERE userID="${req.params.userID}" && childID="${req.params.childID}" `, (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)
       
    })
}

export function getChores(req, res) {
    //console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_account)
    db.query(`SELECT * FROM chores WHERE userID="${req.params.userID}" && childID="${req.params.childID}"`, (error, results) => {
        if (error) {
            console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)
    })
}

export function updateChores(req, res) {
    //console.log(req.body)
    const db = mysql.createConnection(service_account)
    db.query(`UPDATE chores SET ${req.body.set} WHERE ${req.body.where}`, (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
            return
        }
        // console.log(results)
        // res.send(results)
       console.log("TRANSACTIONS: ", req.body)
        db.query(`SELECT * FROM transactions WHERE userID="${req.body.userID}" && childID="${req.body.childID}"`, (error, results) => {
            if (error) {
               // console.log(error)
                res.send(error)
                return
            }
                const payout={}
                payout.body = {
                        transID:"",
                        userID: req.body.userID, 
                        childID: req.body.childID,
                        title: req.body.title, 
                        amount: req.body.amount
                    }
                   // console.log("payout: ",payout)
                if(results) postTransactions(payout, res)
                else(res.send({isPaid:"false"}))
                })

    })
}

export function getTransactions(req, res) {
    //console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_account)
    db.query(`SELECT * FROM transactions WHERE userID="${req.params.userID}" && childID="${req.params.childID}" && account="${req.params.account}" ORDER BY ABS(transID) ASC;`, (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
            return
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
            return
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
            return
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
    if(!transaction.transID)transaction.transID= Date.now().toString()
    if(!transaction.isPending)transaction.isPending= Date.now().toString()
    console.log(transaction)
    const db = mysql.createConnection(service_account)
    db.query(`insert into transactions (transID, userID, childID, isPending, title, amount) 
    values('${transaction.transID}', '${transaction.userID}', '${transaction.childID}', '${transaction.isPending}', '${transaction.title}', '${transaction.amount}');`
    , (error, results) => {
        if (error) {
            // console.log(error)
            res.send(error)
            return
        }
        // console.log(results)
        res.send(results)
        return
    })
}


    export function deleteTransactions(req, res) {
        //console.log("INSIDE FUNCTIONS")
        const db = mysql.createConnection(service_account)
        db.query(`DELETE FROM transactions WHERE transID=${req.body.transID}`, (error, results) => {
            if (error) {
               // console.log(error)
                res.send(error)
                return
            }
           // console.log(results)
            res.send(results)
        })
    }
