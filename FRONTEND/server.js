const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'your-razorpay-key',  // Replace with your Razorpay Key
  key_secret: 'your-razorpay-secret'  // Replace with your Razorpay Secret
});

app.use(bodyParser.json());

// Endpoint for verifying payment
app.post('/verify-payment', (req, res) => {
  const paymentId = req.body.payment_id;
  const orderId = req.body.order_id;
  const signature = req.body.signature;

  const generatedSignature = razorpay.utils.verifyPaymentSignature({
    payment_id: paymentId,
    order_id: orderId,
    signature: signature
  });

  if (generatedSignature) {
    res.status(200).send({ status: 'success', message: 'Payment verified successfully!' });
  } else {
    res.status(400).send({ status: 'failure', message: 'Payment verification failed!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
