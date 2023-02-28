import express from "express"
import cors from "cors"
import {getTransactions} from "./src/utils.js"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 8080

app.get("/check",(req, res)=>{
    res.send("THIS WORKS!! WOW! :D")
})
app.get("/transactions",getTransactions)


app.listen(PORT, ()=>{
    console.log(`Listening to http://<my ip>:${PORT}/....`)
})
