const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/index')
const { urlencoded } = require('express');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.post('/profile', upload.none(), function (req, res, next) {
})
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload());
app.use(express.static("files"));
// app.use("/api/products", productRoute);

 
//Sequelize
db.sequelize.sync().then(() => {
  console.log('Connected to DB.');
});

app.get("/", (req, res) => {
  res.json({ message: "App connected." });
});

// API
require('./routes/user')(app);
require('./routes/work')(app);
require('./routes/request')(app);
// require('./routes/workUser')(app);
// require('./routes/workRequest')(app);
require('./routes/userReq')(app);
require('./routes/organization')(app);
require('./routes/department')(app);
require('./routes/requestUser')(app);
require('./routes/importance')(app);
const PORT = 8080;
app.listen(PORT, "0.0.0.0");

console.log('App listening on port', PORT)