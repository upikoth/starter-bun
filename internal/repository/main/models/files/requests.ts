export interface IMainCreateFileRequest {
	s3Path: string;
	name: string;
	uploadedByUserId: number;
}

export interface IMainGetFilesRequest {
	limit: number;
	offset: number;
	uploadedByUserId?: number;
}
