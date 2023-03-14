import mysql from "mysql2"
import  {MongoClient} from "mongodb"
import { mongo_service_account, mysql_service_account } from "./service_account.js"
import cron from "node-cron"

const dbMysql = mysql.createPool(mysql_service_account)

const client = new MongoClient(mongo_service_account)
const dbMondgo = client.db("pigebank")
const collection = dbMondgo.collection("transactions")

const interval = "* * * * *"

const updateCharts = async ()=>{
    console.log("Updating charts....")
  
    
    dbMysql.query(`SELECT * FROM transactions ORDER BY ABS(transID) ASC;`, async (error, results) => {
        if (error) {
            console.log(error)
            return
        }
        for(let i=0;i<results.length;i++){
            await collection.findOneAndUpdate({transID:results[i].transID},{$set:results[i]})
        }
        
            await collection.insertMany(results)
        
   
    })
}


let cycles=1
if(true){
    updateCharts()
    console.log(`${cycles} cycles `)
    cycles++
}


cron.schedule(interval, async() => {

   updateCharts()
    console.log(`${cycles} cycles `)
    cycles++
});