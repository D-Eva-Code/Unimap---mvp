const express = require('express');

const app = express();
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path :  path.resolve( __dirname , '../../.env')})
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const {createUserAccountS} = require('../controller/createStudentC');
const {createUserAccountV} = require('../controller/createVendorC');


app.post('/user/register', createUserAccountS);
app.post('/vendor/register', createUserAccountV);


app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
