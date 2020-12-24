require('dotenv').config();
const routesList = require('./src/routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const mongoose = require('mongoose');

const express = require('express');
const morgan = require('morgan');

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

routesList.forEach((route) => {
	if (route.router && route.path) app.use(`/api/${route.path}`, route.router);
});
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('MongoDb is connected.');
	app.listen(PORT, () => {
		console.log(`Listening to server port ${PORT}`);
	});
}).catch(err => {
	console.log('Failed to connect MongoDb server...', err);
});