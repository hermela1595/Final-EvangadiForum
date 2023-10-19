// require("dotenv").config();
const pool = require("./server/config/database");
const express = require("express");
const cors = require("cors");
const app = express();
// const port = process.env.PORT;
const port = 4000;
const userRouter = require('./server/api/users/user.router')


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/data', () => {
//     res.json({msg : "hey!"})
// })
app.use("/api/users", userRouter)

app.listen(port, () => console.log(`listening at http://localhost:${port}`));

