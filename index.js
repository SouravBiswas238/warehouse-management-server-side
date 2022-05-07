const express = require('express')
const app = express()
const port = 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');

// yuP8WwAjKkTBlKU6
// bike-directory




const uri = "mongodb+srv://bike-directory:yuP8WwAjKkTBlKU6@cluster0.f3b8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



client.connect(err => {
    console.log('insert from mongo')
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    // client.close();
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})