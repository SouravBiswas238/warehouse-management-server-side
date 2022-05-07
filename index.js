const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// middlewirw
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
        // to redad

        console.log('connected to db');

        app.get('/bikes', async (req, res) => {
            const query = {};

            const cursor = bikeCollection.find(query)
            const bikes = await cursor.toArray();

            res.send(bikes);
        })

        // create bikes information

        // update 
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