import express from "express"
import cors from "cors"
import {updateTransactions, getTransactions} from "./src/utils.js"
import {postTransactions, queryTransactions, deleteTransactions} from "./src/utils.js"
import {getChores, updateChores} from "./src/utils.js"
import {findPin} from "./src/utils.js"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 4040

app.get("/",(req, res)=>{
    res.send("THIS is a test that the API works")
})


    app.get("/findpin/:userID/:childID", findPin)

    app.get("/chores/:userID/:childID", getChores)
    app.patch("/chores",updateChores)
    
    app.get("/transactions/:userID/:childID/:account",getTransactions)
    app.post("/transactions",postTransactions)
    app.patch("/transactions/:userID/:childID/:account",updateTransactions)
    app.delete("/transactions",deleteTransactions)
    
    //app.get("/querytransactions",queryTransactions)






app.listen(PORT, ()=>{
    console.log(`NOTE: sudo node . to start API n EC2\nListening to http://<my ip>:${PORT}/....`)
})
