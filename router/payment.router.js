const express = require("express");
const app = express.Router();
const {
  CFConfig,
  CFPaymentGateway,
  CFCustomerDetails,
  CFOrderRequest,
  CFEnvironment,
  CFOrderMeta,
} = require("cashfree-pg-sdk-nodejs");

const { default: axios } = require("axios");

var cfConfig = new CFConfig(
  CFEnvironment.SANDBOX,
  "2022-01-01",
  "TEST1002652099b78d864e47c81cf00b02562001",
  "TEST8ab9f0a4af339fc1da16b6f6bbc6bf78c5d3a35"
);

var orderMeta = new CFOrderMeta()


app.get("/create-order", async (req,res) => {
  var customerDetails = new CFCustomerDetails();
  customerDetails.customerId = "useewqdweqdrferfm_id";
  customerDetails.customerName="vishal sahu"
  customerDetails.customerPhone = "8433045665";
  customerDetails.customerEmail = "vishalsahu012@gmail.com";

  var d = {};
  d["order_tag_01"] = "TESTING IT";

  var cFOrderRequest = new CFOrderRequest();
  cFOrderRequest.orderAmount = 1;
  cFOrderRequest.orderCurrency = "INR";
  cFOrderRequest.customerDetails = customerDetails;
  cFOrderRequest.orderTags = d;
  cFOrderRequest.orderId = "lkf984154989898415ww6vishalorder";
  orderMeta.returnUrl = `http://localhost:5000/payment/get-order-status/${cFOrderRequest.orderId}`;
  cFOrderRequest.orderMeta = orderMeta;
  
  try {
    var apiInstance = new CFPaymentGateway();
     
    var result = await apiInstance.orderCreate(cfConfig, cFOrderRequest);
    if (result != null) {
      res.json(result)
    }
  } catch (e) {
      console.log(e)
      res.send(e.message);
  }
});


app.get("/get-order-status/:order_id", async (req, res) => {
  const { order_id } = req.params;

  const options = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/orders/${order_id}/payments`,
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": "TEST1002652099b78d864e47c81cf00b02562001",
      "x-client-secret": "TEST8ab9f0a4af339fc1da16b6f6bbc6bf78c5d3a35",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});



module.exports = app;
