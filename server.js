const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const path = require('path')

dotenv.config();
require('./db');

const port = process.env.PORT || 5000;
const paypal = process.env.PAYPAL_CLIENT_ID || "sb";

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const Orders = require('./routes/orders')
const Products = require('./routes/products')
const Users = require('./routes/users')

app.use('/orders', Orders)
app.use('/products', Products)
app.use('/users', Users)

app.get('/config/paypal', (req, res) => {
    res.send(paypal)
})


if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(port, () => {
    console.log(`Server started at ${port} successfully`);
})
