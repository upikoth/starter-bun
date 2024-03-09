import nodemailer from 'nodemailer'

import environment from '@/environment'

export interface ISendMailData {
	to: string;
	subject: string;
	html: string;
}

function sendMail(data: ISendMailData) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: environment.EMAIL_FROM,
			pass: environment.EMAIL_PASSWORD
		}
	})

	return transporter.sendMail(data)
}

export default {
	sendMail
}
