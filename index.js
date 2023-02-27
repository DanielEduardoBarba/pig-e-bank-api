import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 8080

app.get("/ok",(req, res)=>{
    res.send("THIS WORKS!! :D")
})


app.listen(PORT, ()=>{
    console.log(`Update:Listening to port ${PORT} ....`)
})
