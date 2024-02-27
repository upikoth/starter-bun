import type { IMainFile } from './model'

export interface IMainCreateFileResponse {
	id: number;
	s3Path: string;
	name: string;
	uploadedByUserId: number;
}

export interface IMainGetFilesResponse {
	total: number;
	files: IMainFile[]
}
