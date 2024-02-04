import type { IFile } from './model'

export interface IUploadFileResponse {
	file: IFile;
}

export interface IGetFilesResponse {
	files: IFile[];
	limit: number;
	offset: number;
	total: number;
}

export interface IGetFileResponse {
	file: IFile;
}
