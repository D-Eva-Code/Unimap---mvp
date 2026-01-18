const express = require('express');

const app = express();
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path :  path.resolve( __dirname , '../../.env')})
// const bodyParser = require('body-parser');
const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:5173',
// //   credentials: true
// }));
app.use(express.json());
app.use(cors());


const {RegisterUsers} = require('../controller/createUserC');
const {loginController} = require('../controller/loginC');
const {getVendorsController} = require('../controller/getVendorsC');
const {getMenuController} = require('../controller/getMenuC');
const {auth} = require('../middleware/auth');
const {checkout} = require('../controller/checkoutController');

const {
  fetchAllLocations,
  searchCampusLocations,
  addCampusLocation
} = require('../controller/campusLocationController');


app.get('/locations', fetchAllLocations);
app.get('/locations/search', searchCampusLocations);

// Admin
app.post('/locations', addCampusLocation);

app.post('/checkout', auth, checkout);
app.post('/user/register', RegisterUsers);
app.post('/user/login', loginController);
app.get('/vendors', getVendorsController);
app.get('/vendor/:id/menu', getMenuController);
// app.post('/Register', createUserAccountS);
// app.post('/vendor/register', createUserAccountV);


app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
