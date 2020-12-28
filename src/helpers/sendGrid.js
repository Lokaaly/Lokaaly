const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_API_KEY);
const mailTemplates = require('./sg_templates');

async function sendEmail(reciever, subject, html) {
  try {
    const mail = {
      from: process.env.SG_SENDER_EMAIL,
      to: reciever,
      subject,
      html,
    };
		debugger;
		const response = await sgMail.send(mail);
		return response;
  } catch (error) {
    console.log('Error happend during sending email.', error);
    throw error;
  }
}

class MailSenderManager {
  static async sendSignUpConfirmationCode(reciever, code) {
		const subject = '[Lokaaly] Your account confirmation code';
		const htmlStr = mailTemplates.confirmationCode(code);
    return await sendEmail(reciever, subject, htmlStr);
	}

	static async sendSubmitionForVendor (reciever, genPass) {
		const subject = '[Lokaaly] Congratulations, you have been submitted as a vendor';
		const htmlStr = mailTemplates.sendSubmitionNotification(genPass);
    return await sendEmail(reciever, subject, htmlStr);
	}

	static async sendResetPasswordCode(reciever, code) {
		const subject = '[Lokaaly] Your password reset code';
		const htmlStr = mailTemplates.passwordReset(code);
    return await sendEmail(reciever, subject, htmlStr);
	}
}

module.exports =  { 
  MailSenderManager
};