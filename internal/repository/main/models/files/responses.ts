import type { IMainFile } from './model'

export interface IMainCreateResponse {
	id: number;
	s3Id: string;
	name: string;
	uploadedByUserId: number;
}

export interface IMainGetFilesResponse {
	total: number;
	files: IMainFile[]
}
