require('dotenv').config();
const routesList = require('./src/routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');


const rp = require('request-promise');
const formidableMiddleware = require('express-formidable');



const mongoose = require('mongoose');

const express = require('express');
const morgan = require('morgan');
const { Admin } = require('./src/models/model.user');
const { ROLES } = require('./src/models/static.data');

const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(helmet());
app.use(bodyParser.json());


const swaggerServers = process.env.NODE_ENV === 'production'
 ? [{ url:'https://api-lokaaly.herokuapp.com/api' }]
 : [{ url: 'http://localhost:8080/api' }, { url: 'https://api-lokaaly.herokuapp.com/api' }];

const swaggerDocs = swaggerJsDoc({
	definition:{
		openapi: "3.0.0",
		info: {
			title: 'Lokaaly Express API with Swagger',
			version: '0.1.0',
			description: 'Web & mobile API',
		},
		servers: swaggerServers,
	},
	apis: ['./src/**/swagger/swagger.*.js']
});

app.post('/api/paytabs/payment', formidableMiddleware(), async (req, res) => {
	try {
		debugger;
		var options = { 
			method: "POST", 
			uri: "https://secure-global.paytabs.com/payment/token",
			body: { 
				"profile_id": 61430,
				"token": req.fields.token,
			},
			headers:{
				"authorization": "SBJNND9HJL-JB6DKTLMGL-9WNJZ6JJJJ",
				"content-type": "application/json"
		 },
			json: true
		};
		debugger;
		const response = await new Promise((resolve, reject) => {
			rp(options).then(data => {
				resolve(JSON.parse(data));
			}).catch(err => { reject(err); })
		});

		debugger;
		res.send(response);
	} catch (error) {
		res.status(409).send(error)
	}
});


routesList.forEach((route) => {
	if (route.router && route.path) app.use(`/api/${route.path}`, route.router);
});
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('MongoDb is connected.');
	// Initialize ADMIN
	return Admin.findOneAndUpdate({ email: process.env.ADMIN_EMAIL, role: ROLES.ADMIN }, { password: process.env.ADMIN_PASS }, { upsert: true });
}).then(() => {
	app.listen(PORT, () => {
		console.log(`Listening to server port ${PORT}`);
	});
}).catch(err => {
	console.log('Failed to connect MongoDb server...', err);
});