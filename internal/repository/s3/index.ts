import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

import environment from '@/environment'

function getS3Client() {
	return new S3Client({
		region: environment.S3_REGION,
		endpoint: environment.S3_ENDPOINT,
		credentials: {
			secretAccessKey: environment.S3_SECRET_ACCESS_KEY,
			accessKeyId: environment.S3_ACCESS_KEY_ID
		}
	})
}

async function uploadFileToS3(file: File, filePath: string) {
	const client = getS3Client()

	const command = new PutObjectCommand({
		Bucket: environment.S3_BUCKET_NAME,
		Key: filePath,
		ContentType: file.type,
		Body: Buffer.from(await file.arrayBuffer())
	})

	await client.send(command)
}

async function deleteFileFromS3(filePath: string) {
	const client = getS3Client()

	const command = new DeleteObjectCommand({
		Bucket: environment.S3_BUCKET_NAME,
		Key: filePath
	})

	await client.send(command)
}

export default {
	uploadFileToS3,
	deleteFileFromS3
}
