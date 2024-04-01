export enum UserStatusEnum {
	Active = 'active',
	Blocked = 'blocked'
}

export enum UserRoleEnum {
	User = 'user',
	Admin = 'admin',
	SuperAdmin = 'super-admin'
}

export enum UserActionEnum {
	GetAnyUserInfo = 'get-any-user-info',
	GetMyUserInfo = 'get-my-user-info',
	CreateUser = 'create-user',
	UpdateAnyUserInfo = 'update-any-user-info',
	UpdateAnyUserWithRoleAdminInfo = 'update-any-user-with-role-admin-info',
	UpdateAnyUserWithRoleUserInfo = 'update-any-user-with-role-user-info',
	UpdateMyUserInfo = 'update-my-user-info',
	GetAnySession = 'get-any-session',
	DeleteAnySession = 'delete-any-session',
	DeleteMySession = 'delete-my-session',
	GetAnyRegistration = 'get-any-registration',
	DeleteAnyRegistration = 'delete-any-registration',
	UploadFiles = 'upload-files',
	GetAnyFileInfo = 'get-any-file-info',
	GetMyFileInfo = 'get-my-file-info',
	DeleteAnyFileInfo = 'delete-any-file-info',
	DeleteMyFileInfo = 'delete-my-file-info'
}

export interface IUser {
	id: number;
	email: string;
	role: UserRoleEnum;
	status: UserStatusEnum;
}
