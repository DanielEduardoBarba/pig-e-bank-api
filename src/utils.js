import mysql from "mysql2"
import { mysql_service_account } from "../service_account.js"

const db = mysql.createPool(mysql_service_account)

export function postChild(req, res) {
    db.query(`INSERT INTO users ( userID, adminPin, childID, pin) 
    values('${req.body.userID}', '${req.body.adminPin}','${req.body.childID}', '${req.body.pin}');`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}
export function findPin(req, res) {

    db.query(`SELECT * FROM users WHERE userID="${req.params.userID}" && childID="${req.params.childID}" `, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)
    })
}

export function findChildren(req, res) {

    db.query(`SELECT * FROM users WHERE userID="${req.params.userID}"`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}

export function getChores(req, res) {

    db.query(`SELECT * FROM chores WHERE userID="${req.params.userID}" && childID="${req.params.childID}"`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}

export function updateChores(req, res) {

    let set = ""
    if (req.body.action == "done") set = `isDone="${Date.now().toString()}"`
    if (req.body.action == "pending") set = `isDone="false"`
   
    db.query(`UPDATE chores SET ${set} WHERE choreID="${req.body.choreID}";`, (error, results) => {
        if (error) {
            console.log(error)
            res.send(error)
            return
        }

        if (results.serverStatus == 34) {

            if (req.body.action == "done") {

                const payout = {}
                payout.body = {
                    transID: "",
                    userID: req.body.userID,
                    childID: req.body.childID,
                    title: `Chore ID-${req.body.choreID}: ${req.body.title}`,
                    amount: req.body.amount,
                    isPending: req.body.choreID,
                    account: "checking"
                }

                postTransactions(payout, res)
            }
            else if (req.body.action == "pending")  deleteTransactions(req, res)
            else (res.send({ isPaid: "false" }))
        }
    })
}


export function deleteChores(req, res) {

    let set = `choreID="${req.body.choreID}"`
    db.query(`DELETE FROM chores WHERE ${set};`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}


export function postChores(req, res) {

    if (!req.body.choreID) req.body.choreID = Date.now().toString()

    db.query(`INSERT INTO chores (choreID, userID, childID, title, isDone, amount) 
    values('${req.body.choreID}', '${req.body.userID}', '${req.body.childID}', '${req.body.title}', '${req.body.isDone}', '${req.body.amount}');`
        , (error, results) => {
            if (error) {
                res.send(error)
                return
            }
            res.send(results)
            return
        })
}



export function getCredit(req, res) {

    db.query(`SELECT * FROM credit WHERE userID="${req.params.userID}" && childID="${req.params.childID}" ORDER BY ABS(loanID) ASC;`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}
export function postCredit(req, res) {
    
    db.query(`INSERT INTO credit(loanID, userID, childID, account, amount, APR, frequency) values('${req.body.loanID}', '${req.body.userID}','${req.body.childID}', '${req.body.account}', '${req.body.amount}', '${req.body.APR}', '${req.body.frequency}');`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}


export function getTransactions(req, res) {

    db.query(`SELECT * FROM transactions WHERE userID="${req.params.userID}" && childID="${req.params.childID}" && account="${req.params.account}" ORDER BY ABS(transID) ASC;`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}

export function updateTransactions(req, res) {

    let set = ""
    if (req.body.action == "pending") set = `isPending="${Date.now().toString()}"`
    if (req.body.action == "approve") set = `isPending="false"`

    if(set)db.query(`UPDATE transactions SET ${set} WHERE userID="${req.params.userID}" && childID="${req.params.childID}" && account="${req.params.account}" && transID="${req.body.transID}"`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }

        if(req.body.isPending!="false"){
            req.body.choreID=req.body.isPending
            deleteChores(req,res)
        }
        else res.send(results)
    })
    else res.send({message: "No change made"})
}

export function postTransactions(req, res) {

    if (!req.body.account) {
        res.send({ message: "Need account type" })
        return
    }

    const year = new Date().getFullYear().toString()
    const month = String(new Date().getMonth()+1)
    const day = new Date().getUTCDate().toString()
    const hour = new Date().getUTCHours().toString()
    const minutes = new Date().getUTCMinutes().toString()
    const seconds = new Date().getUTCSeconds().toString()

    const dateOf=`${day}/${month}/${year} ${hour}:${minutes}:${seconds}`

    if (!req.body.transID) req.body.transID = Date.now().toString()
    if (!req.body.isPending) req.body.isPending = Date.now().toString()
    
    db.query(`INSERT INTO transactions (dateOf, transID, userID, childID, account, isPending, title, amount) values('${dateOf}', '${req.body.transID}', '${req.body.userID}', '${req.body.childID}', '${req.body.account}', '${req.body.isPending}', '${req.body.title}', '${req.body.amount}');`
        , (error, results) => {
            if (error) {
                res.send(error)
                return
            }
            res.send(results)
            return
        })
}

export function deleteTransactions(req, res) {

    let set = ""
    if (req.body.action == "pending") set = `isPending="${req.body.choreID}"`
    else set = `transID="${req.body.transID}"`
    db.query(`DELETE FROM transactions WHERE ${set};`, (error, results) => {
        if (error) {
            res.send(error)
            return
        }
        res.send(results)
    })
}
