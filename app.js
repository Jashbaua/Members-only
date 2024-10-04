const express = require("express");
const bcrypt = require('bcryptjs')
const rootRouter=require('./routes/rootRouter')

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));