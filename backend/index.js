let express = require("express");
let app = express();
let cors = require("cors");
let multer = require("multer");
let upload = multer();
let cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
let sessions = {};
let passwords = {};
let messages = [];
let generateId = () => {
  return "" + Math.floor(Math.random() * 10000000);
};
app.post("/signup", upload.none(), (req, res) => {
  let username = req.body.username;
  let enteredPassword = req.body.password;
  // if (passwords[username] !== undefined) {
  //   res.send(JSON.stringify({ success: true }));
  //   return;
  // }
  passwords[username] = enteredPassword;
  res.send(JSON.stringify({ success: true }));
});
app.post("/login", upload.none(), (req, res) => {
  let username = req.body.username;
  let enteredPassword = req.body.password;
  let expectedPassword = passwords[username];
  if (enteredPassword === expectedPassword) {
    let sessionId = generateId();
    console.log(sessionId);
    sessions[sessionId] = username;
    res.cookie("sid", sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  return res.send(JSON.stringify({ success: false }));
});
app.post("/newmessages", upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  let msg = req.body.msg;
  console.log(req.body);
  let newMsg = { username: username, message: msg };
  messages = messages.concat(newMsg);
  res.send(JSON.stringify({ success: true }));
});
app.get("/messages", (req, res) => {
  let sessionId = req.cookies.sid;
  let username = sessions[sessionId];
  if (username === undefined) {
    res.send("STOP HACKER");
    return;
  }
  res.send(JSON.stringify(messages));
});
app.listen(4000);
