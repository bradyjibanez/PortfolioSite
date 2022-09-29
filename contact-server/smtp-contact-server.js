const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const transport_obj = require('./_helpers/transport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/sendmail", (req, res) => {
  sendMail(req.body).then(response => response ? res.json({ status: "success" }) :
	res.status(500).json({ status: "failed" }));
})

async function sendMail(message_request) {
	const message = {
	    from: message_request.from,
	    to: 'bradyjibanez@gmail.com',
	    subject: 'message to your PortfolioSite from: '+message_request.name+" @  "+message_request.from,
	    text: message_request.body
	};
	let transport_promise = new Promise((resolve) => {
		nodemailer.createTransport(transport_obj).sendMail(message, function(err, info) {
		    if (err) {
		      resolve(false);
		    } else {
		      resolve(true)
		    }		
		})
	});
	let result = await transport_promise;
	return result;
};

app.listen(3000, () => {
  console.log("bradyjibanez portfolio smtp server...ENGAGE");
  console.log("TRANS::: ", transport_obj)
});
