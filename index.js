import express from "express"
import cors from "cors"
import {updateTransactions, getTransactions, postTransactions, queryTransactions} from "./src/utils.js"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 80

app.get("/check",(req, res)=>{
    res.send("THIS WORKS!! WOW! :D")
})
app.get("/transactions",getTransactions)
app.post("/transactions",postTransactions)
app.patch("/transactions",updateTransactions)

app.get("/querytransactions",queryTransactions)

app.listen(PORT, ()=>{
    console.log(`NOTE: make sure I am running SUDO for EC2 port 80 listening\nListening to http://<my ip>:${PORT}/....`)
})
