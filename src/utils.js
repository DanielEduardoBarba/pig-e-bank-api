import mysql from "mysql2"
import { service_acount } from "../service_account.js"

export function getTransactions(req,res){
    console.log("INSIDE FUNCTIONS")
    const db = mysql.createConnection(service_acount)
    // db.query("SELECT * FROM transactions",(error,results)=>{
    //     if(error)console.log(error)
    //     console.log(results)
    // })
}