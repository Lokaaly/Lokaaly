const config = require('../config/config');

const Mailgun = require('mailgun-js');
const mailgun = new Mailgun({ apiKey: config.MAILGUN_API_KEY, domain: config.MAILGUN_DOMAIN });

async function sendMail(data) {
	const result = await mailgun.messages().send({
		to: 'classmaster48@gmail.com',
		from: 'edgar.petrosyan.93@hotmail.com',
		subject: 'Subject',
		text: 'Test text'
	});

	return result;
}

module.exports = {
	sendMail
};