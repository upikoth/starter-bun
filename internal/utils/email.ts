import nodemailer from 'nodemailer'

import environment from '@/environment'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: environment.EMAIL_FROM,
		pass: environment.EMAIL_PASSWORD
	}
})

interface ISendMailData {
	to: string;
	subject: string;
	html: string;
}

export const sendMail = (data: ISendMailData) => {
	return transporter.sendMail(data)
}
