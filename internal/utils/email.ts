import nodemailer from 'nodemailer'

import environment from '@/environment'

interface ISendMailData {
	to: string;
	subject: string;
	html: string;
}

export function sendMail(data: ISendMailData) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: environment.EMAIL_FROM,
			pass: environment.EMAIL_PASSWORD
		}
	})

	transporter.sendMail(data)
}
