import express from "express"
import cors from "cors"
import {updateTransactions, getTransactions, postTransactions, queryTransactions} from "./src/utils.js"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 4040

app.get("/",(req, res)=>{
    res.send("THIS WORKS!! WOW! :D great job AWS")
})
app.get("/transactions",getTransactions)
app.post("/transactions",postTransactions)
app.patch("/transactions",updateTransactions)

app.get("/querytransactions",queryTransactions)

app.listen(PORT, ()=>{
    console.log(`NOTE: sudo node . to start API n EC2\nListening to http://<my ip>:${PORT}/....`)
})
