import mysql from "mysql2"
import { service_account } from "../service_account.js"

export function getTransactions(req, res) {
    //console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_account)
    db.query("SELECT * FROM transactions", (error, results) => {
        if (error) {
           // console.log(error)
            res.send(error)
        }
       // console.log(results)
        res.send(results)
    })
}