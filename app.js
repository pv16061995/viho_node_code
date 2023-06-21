const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/config')
const app = express();
const port = 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }));

db.authenticate().then(() => { console.log('connected'); });

const routes = require("./routes");

app.use("/", routes);

db.sync();

app.listen(port || process.env.port, () => {
    console.log(`server started on port ${port}`)
})
module.exports = app;