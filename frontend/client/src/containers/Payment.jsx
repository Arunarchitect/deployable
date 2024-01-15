import TshirtImg from '../assets/react.svg';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Payment() {
  const [amount, setAmount] = useState(50000);
  const currency = "INR";
  const receiptId = "r1";

  const paymentHandler = async (e) => {
    const response = await fetch("/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_live_MyISyBMETyjUMF", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Modelflick", //your business name
      description: "Donation",
      image: TshirtImg,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Modellfick", //your customer's name
        email: "modelflick@gmail.com",
        contact: "9447648320", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <Layout  title='Modelflick | Login' content='Login page'>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} className="product" style={{ padding: '10px' }}>
            <h2>Donate to Modelflick</h2>
            <p>You are free to change the default donation in the field!</p>
            <img src={TshirtImg} alt="" style={{ width: '300px', height: 'auto' }} />
            <br />
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="donationAmount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control
                  type="number"
                  value={amount / 100} // Display amount in rupees
                  onChange={(e) => setAmount(parseInt(e.target.value * 100, 10))} // Multiply by 100 to convert to paise
                />
              </Form.Group>
              <Button variant="primary" style={{ padding: '10px', width: '100px', height: 'auto' }} onClick={paymentHandler}>
                Donate
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Payment;