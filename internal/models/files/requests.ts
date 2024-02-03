export interface IUploadFileRequest {
	uploadedByUserId: number;
	file: File;
}

export interface IGetFilesRequest {
	limit: number;
	offset: number;
	uploadedByUserId?: number;
}
