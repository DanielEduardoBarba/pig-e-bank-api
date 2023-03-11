import mysql from "mysql2"
import { service_account } from "../service_account.js"

const db = mysql.createPool(service_account)



export function postChild(req, res) {
    console.log(req.params)
    //const db = mysql.createPool(service_account)
    db.query(`INSERT INTO users ( userID, adminPin, childID, pin) 
    values('${req.body.userID}', '${req.body.adminPin}','${req.body.childID}', '${req.body.pin}');`, (error, results) => {
        if (error) {
            // console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)

    })
}
export function findPin(req, res) {
    console.log(req.params)
    //const db = mysql.createPool(service_account)
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

export function findChildren(req, res) {
    console.log(req.params)
    //const db = mysql.createPool(service_account)
    db.query(`SELECT * FROM users WHERE userID="${req.params.userID}"`, (error, results) => {
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
    //const db = mysql.createPool(service_account)
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
    console.log("INCOMING: ", req.body)
    let set = ""
    if (req.body.action == "done") set = `isDone="${Date.now().toString()}"`
    if (req.body.action == "pending") set = `isDone="false"`
    //console.log("TO BE SENT ",req.body, set)

    //const db = mysql.createPool(service_account)
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
            else if (req.body.action == "pending") {
                console.log("PENDING ACTION DELETE", req.body)
                deleteTransactions(req, res)
            }
            else (res.send({ isPaid: "false" }))

        }
    })
}


export function deleteChores(req, res) {
    let set = `choreID="${req.body.choreID}"`
    db.query(`DELETE FROM chores WHERE ${set};`, (error, results) => {
        if (error) {
            console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)
    })
}


export function postChores(req, res) {

    if (!req.body.choreID) req.body.choreID = Date.now().toString()

    console.log(req.body)

    //const db = mysql.createPool(service_account)
    
//insert into chores ( choreID, userID, childID, title, isDone, amount) values ( '123456', 'DsRNmKjspkZFjfBXZdJi2HHcXCP2', 'billthekiddo', 'Take out trach', "false", 40);
    db.query(`INSERT INTO chores (choreID, userID, childID, title, isDone, amount) 
    values('${req.body.choreID}', '${req.body.userID}', '${req.body.childID}', '${req.body.title}', '${req.body.isDone}', '${req.body.amount}');`
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



export function getCredit(req, res) {
    //console.log("INSIDE FUNCTIONS")
    //const db = mysql.createPool(service_account)
    console.log(req.params)
    db.query(`SELECT * FROM credit WHERE userID="${req.params.userID}" && childID="${req.params.childID}" ORDER BY ABS(loanID) ASC;`, (error, results) => {
        if (error) {
            // console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)
    })
}


export function getTransactions(req, res) {
    //console.log("INSIDE FUNCTIONS")
    //const db = mysql.createPool(service_account)
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

// export function queryTransactions(req, res) {
//     //console.log("INSIDE FUNCTIONS")
//     //const db = mysql.createPool(service_account)
//     db.query(`SELECT * FROM transactions WHERE ${req.body.where}`, (error, results) => {
//         if (error) {
//            // console.log(error)
//             res.send(error)
//             return
//         }
//        // console.log(results)
//         res.send(results)
//     })
// }

// send in body as the arguement
// {
//     "where":"transID = 114323423"
//      "set": "amount=43.23"
// }
export function updateTransactions(req, res) {
    console.log("INCOMING :", req.body)
    console.log("ACTIONS :", req.body)

    let set = ""

    //const db = mysql.createPool(service_account)
    if (req.body.action == "pending") set = `isPending="${Date.now().toString()}"`
    if (req.body.action == "approve") set = `isPending="false"`

    if(set)db.query(`UPDATE transactions SET ${set} WHERE userID="${req.params.userID}" && childID="${req.params.childID}" && account="${req.params.account}" && transID="${req.body.transID}"`, (error, results) => {
        if (error) {
            console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        //res.send(results)

        if(req.body.isPending!="false"){
            req.body.choreID=req.body.isPending
            deleteChores(req,res)
        }
        else res.send(results)
    })
    else res.send({message: "No change made"})
}

// const transaction = {
//     transID: "",
//     userID: "143235453523", 
//     childID: "1243235",
//     title: "Something R US", 
//     amount: 4332435
// }


export function postTransactions(req, res) {
    if (!req.body.account) {
        res.send({ message: "Need account type" })
        return
    }

    if (!req.body.transID) req.body.transID = Date.now().toString()
    if (!req.body.isPending) req.body.isPending = Date.now().toString()
    console.log(req.body)
    //const db = mysql.createPool(service_account)
    db.query(`INSERT INTO transactions (transID, userID, childID, account, isPending, title, amount) 
    values('${req.body.transID}', '${req.body.userID}', '${req.body.childID}', '${req.body.account}', '${req.body.isPending}', '${req.body.title}', '${req.body.amount}');`
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
    console.log("INSIDE DELETE FUNCTIONS")
    let set = ""
    //const db = mysql.createPool(service_account)
    if (req.body.action == "pending") set = `isPending="${req.body.choreID}"`
    else set = `transID="${req.body.transID}"`
    db.query(`DELETE FROM transactions WHERE ${set};`, (error, results) => {
        if (error) {
            console.log(error)
            res.send(error)
            return
        }
        console.log(results)
        res.send(results)
    })
}
