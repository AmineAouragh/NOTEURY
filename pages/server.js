import express from 'express'

const app = express()

app.use("/", (req, res) => {
    res.send("I will be shown in the browser")
    console.log("I will be shown in the terminal")
})

app.listen(3000)