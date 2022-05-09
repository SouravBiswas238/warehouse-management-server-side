const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000;
const app = express();

// middle Wire
app.use(cors());
app.use(express.json());

// yuP8WwAjKkTBlKU6
// bike-directory

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f3b8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const bikeCollection = client.db("bikes-collection").collection("bikes");

        //find, Load all data
        console.log('connected to db');

        app.get('/bikes', async (req, res) => {
            const query = {};
            const cursor = bikeCollection.find(query)
            const bikes = await cursor.toArray();
            res.send(bikes);
        });
        // Load single data
        app.get('/bikes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const bike = await bikeCollection.findOne(query);
            res.send(bike);
        })

        // post data
        app.post('/bike', async (req, res) => {

            const data = req.body;
            console.log(data);
            const result = await bikeCollection.insertOne(data);
            res.send(result);
        })

        // update 
        app.put('/bikes/:id', async (req, res) => {
            const id = req.params.id;
            const quantity = req.body;
            console.log(quantity)
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: quantity.updateQuantity
                }
            }
            const result = await bikeCollection.updateOne(filter, updateDoc, options);
            res.send(result);


        })


        // delete a user
        app.delete('/bikes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bikeCollection.deleteOne(query);
            res.send(result);

        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})