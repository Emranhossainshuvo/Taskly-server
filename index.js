const express = require('express'); 
const app = express(); 
const cors = require('cors');
require('dotenv').config(); 
const prot = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json()); 



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0fn8ke9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let taskCollection; 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    taskCollection = client.db('Taskly').collection('task-collection');

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.post('/tasks', async (req, res) => {
  const newTask = req.body; 
  const result = await taskCollection.insertOne(newTask); 
  res.send(result)
})

app.get('/', (req, res) => {
    res.send('taskly server running'); 
})

app.listen(prot, () => {
    console.log('taskly server...........')
})