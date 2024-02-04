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

export async function uploadFileToS3(file: File, fileS3Id: string, userId: number) {
	const client = getS3Client()

	const command = new PutObjectCommand({
		Bucket: environment.S3_BUCKET_NAME,
		Key: `${userId}/${fileS3Id}`,
		ContentType: file.type,
		Body: Buffer.from(await file.arrayBuffer())
	})

	await client.send(command)
}

export async function deleteFileFromS3(fileS3Id: string, userId: number) {
	const client = getS3Client()

	const command = new DeleteObjectCommand({
		Bucket: environment.S3_BUCKET_NAME,
		Key: `${userId}/${fileS3Id}`
	})

	await client.send(command)
}
