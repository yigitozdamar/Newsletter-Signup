const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const eMail = req.body.eMail;
  console.log(fName, lName, eMail);

  var data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/881baf3382";
  const options = {
    method: "POST",
    auth: "yigitozdamar:a9dddbdb27aa180ef6aa7896c080db34-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      //res.send("Successfully subscribed!")
      res.sendFile(__dirname + "/success.html");
    } else {
      //res.send("There was an error with signing up, please try again!")
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  //request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000! 🚀🚀🚀");
});

//a9dddbdb27aa180ef6aa7896c080db34-us14
// ID  881baf3382
