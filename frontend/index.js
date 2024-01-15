const express = require('express');

const cookieParser = require('cookie-parser')

const cors = require('cors');

const path = require('path');

require('dotenv').config();

const Razorpay = require("razorpay");

const crypto = require("crypto");



const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const meRoute = require('./routes/auth/me');
const logoutRoute = require('./routes/auth/logout');
const verifyRoute = require('./routes/auth/verify');
const getblogRoute = require('./routes/blog/getblog');

const app = express();

app.use(express.json())

app.use(cors());
app.use(cookieParser());

// Use the route handlers for specific endpoints
app.use(loginRoute);

app.use(meRoute);
app.use(registerRoute);
app.use(logoutRoute);
app.use(verifyRoute);


app.use(getblogRoute);



app.use(express.urlencoded({ extended: false }));

app.use(express.static('client/dist'));
app.get('*', (req, res) => {
    const myPath = path.resolve(__dirname, 'client', 'dist', 'index.html');
    console.log('__dirname',__dirname);
    console.log('MyPath:',myPath);
    return res.sendFile(myPath);
});



const PORT = process .env.PORT || 5000;

app.post("/order", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error1");
      }
  
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error 2");
    }
  });
  
  app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });
  

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// app.get('*', (req, res) => {
//     return res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
//     console.log('__dirname',__dirname);
// })