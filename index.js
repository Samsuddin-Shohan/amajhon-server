const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const res = require("express/lib/response");

const PORT = process.env.PORT || 6000;
console.log(PORT);

const app = express();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.clkdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('database connected');
    const database = client.db("online-store");
    const productsCollection = database.collection("products");
    const reviewCollection = database.collection("review");
    //GET API
    console.log('hello');
    app.get("/products", async (req, res) => {
      console.log(req.query);
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

    
      const cursors = productsCollection.find({});
      const count = await cursors.count();
     // console.log(count);

      let products;
      if(page){
        products = await cursors.skip(page*size).limit(size).toArray();
      }
      else{
        products = await cursors.toArray();
      }

      res.send({
        count,
        products,
      });
    });
    app.post("/review",async(req,res)=>{
      const {name,img,description,profession,rating}=req.body;
      const result = await reviewCollection.insertOne({
        name,
        img,
        description,
        profession,
        rating
      });
      res.send(result);

    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("hello bruh");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
