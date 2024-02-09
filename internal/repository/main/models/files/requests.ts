export interface IMainCreateRequest {
	s3Id: string;
	name: string;
	uploadedByUserId: number;
}

export interface IMainGetFilesRequest {
	limit: number;
	offset: number;
	uploadedByUserId?: number;
}
