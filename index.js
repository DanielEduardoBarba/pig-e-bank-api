import express from "express"
import cors from "cors"
import {updateTransactions, getTransactions} from "./src/utils.js"
import {postTransactions, deleteTransactions} from "./src/utils.js"
import {getChores, updateChores, postChores} from "./src/utils.js"
import {findPin, findChildren, deleteChores} from "./src/utils.js"
import {postChild, getCredit} from "./src/utils.js"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 4040

app.get("/",(req, res)=>{
    res.send("Pre Final MVP test okay")
})


    app.get("/findpin/:userID/:childID", findPin)

    app.get("/children/:userID", findChildren)
    app.post("/children", postChild)

    app.get("/chores/:userID/:childID", getChores)
    app.post("/chores",postChores)
    app.patch("/chores",updateChores)
    app.delete("/chores",deleteChores)
    
    app.get("/credit/:userID/:childID",getCredit)

    app.get("/transactions/:userID/:childID/:account",getTransactions)
    app.post("/transactions",postTransactions)
    app.patch("/transactions/:userID/:childID/:account",updateTransactions)
    app.delete("/transactions",deleteTransactions)
    
    //app.get("/querytransactions",queryTransactions)






app.listen(PORT, ()=>{
    console.log(`NOTE: sudo node . to start API n EC2\nListening to http://<my ip>:${PORT}/....`)
})
