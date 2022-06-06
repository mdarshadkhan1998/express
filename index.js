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


  app.post("/user/login", (req, res, next) => {
    if ((req.body.role) === "voter"){
        if (!req.body.username || !req.body.password){
            res.status(400).send("please provide username and password")
        }
    }
    
    fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
      let store = JSON.parse(data);
      store.user = store.user.map((e) => {
        if (e.username == req.body.username && e.password == req.body.password){return {...e,token: uuid()}}
        return e;
      });
        fs.writeFile("./db.json", JSON.stringify(store),  { encoding: "utf-8" }, () => {res.status(200).send("login Successful")}
      )
    })

    fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
        let store = JSON.parse(data);
        var count=1;
        store.user = store.user.map((e) => {
            if (e.username == req.body.username){
                count++
            }
            
          });
          if(count==store.user.length){
              fs.writeFile("./db.json", JSON.stringify(store),  { encoding: "utf-8" }, () => {res.status(401).send("Invalid Credentials")})
          }
        console.log(count)
      })
  });
  
  
  app.post("/user/logout", (req, res, next) => {
    fs.readFile("./db.json", { encoding: "utf-8"}, (err, data) => {
      let store = JSON.parse(data);
      store.user = store.user.map((e) => { if (e.token && e.username == req.body.username && e.password == req.body.password) { delete e.token }
        // return e;
      });
      fs.writeFile("./db.json",JSON.stringify(store), { encoding: "utf-8" }, () => {res.status(201).send("user logged out successfully")}
      );
    });
  });


  
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log("Running on http://localhost8080")
});