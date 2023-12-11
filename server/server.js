const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3000;
// const db = process.env.DB

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})