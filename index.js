import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 80

app.get("/ok",(req, res)=>{
    res.send("THIS WORKS!! :D")
})


app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT} ....`)
})
