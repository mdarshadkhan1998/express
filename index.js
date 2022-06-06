const express = require("express");
const fs = require("fs");
const app = express();
const { v4: uuid } = require('uuid');

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/user/create", (req, res) => {
    fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
      const parsed = JSON.parse(data);
      parsed.user = [...parsed.user, req.body];
      fs.writeFile("./db.json", JSON.stringify(parsed), { encoding: "utf-8" },(err,data) => {
          console.log(data)
          res.status(201).send("User Created");
        }
      );
    });
  });


app.post("/user/login", (req,res,next) => {
    // // if ((req.body.role) === "voter"){
    // //     if (!req.body.username || !req.body.password)
    // //     {
    // //         res.status(400).send("please provide username and password")
    // //     }
    // //     else
    // //     {
    //         fs.readFile("./db.json",{encoding: "utf-8"},(err,data) => {

    //             let myi = JSON.parse(data);
    //             for (var i=0; i<myi.user.length; i++){
    //                 // console.log(myi.user[i])
    //                 if (myi.user[i].username === req.body.username && myi.user[i].password === req.body.password){
    //                     let token = uuid();
    //                     // console.log(token)
    //                     fs.write("./db.json",myi,{ encoding: "utf-8" },(err,data) => {
    //                         console.log(data)
    //                         // res.status(201).send(token);
    //                     })
    //                 }
    //             }
    //         })
    // //     }
    // // }
 })

app.listen(8080,()=>{
    console.log("Running on http://localhost8080")
});