const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',async(req,res)=>{
    res.send('hello bruh');
})


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})