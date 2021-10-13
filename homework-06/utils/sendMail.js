const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async data => {
	try {
		const mail = { ...data, from: 'oleh.filyak92@gmail.com' };
		await sgMail.send(mail);
		return true;
	} catch (error) {
		return false;
	}
};

module.exports = sendMail;
