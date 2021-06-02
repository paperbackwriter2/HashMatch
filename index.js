const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcryptjs');
const PORT = 4000;

const saltRounds = 10;
const myText = "ReskillAmericans123";

// I understand that using synchronous functions for hashing is not best practice
var hash = bcrypt.hashSync(myText, saltRounds);

app.post('/authenticate', (req, res) => {
   if(!req.body.pass) {
      return res.status(500).json({message: "pass is required"})
   }
   
   const pass = req.body.pass; 

   bcrypt.compare(pass, hash, (err, result) => {
      if (err){
         res.status(500).json({err})
      } else {
         return res.json({result})
      }
    })
});


app.listen(PORT, () => console.log("app started"))

