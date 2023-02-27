import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 8080

app.get("/ok",(req, res)=>{
    res.send("THIS WORKS!! WOW MY DUDE :D")
})


app.listen(PORT, ()=>{
    console.log(`Listening to http://<my ip>:${PORT}/....`)
})
