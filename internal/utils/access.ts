import { UserActionEnum, UserRoleEnum } from '@/models'
import type { IUser } from '@/models'

const userRoleActionMapping: Record<UserRoleEnum, Set<UserActionEnum>> = {
	[UserRoleEnum.User]: new Set([
		UserActionEnum.GetMyUserInfo,
		UserActionEnum.UpdateMyUserInfo,
		UserActionEnum.DeleteMySession,
		UserActionEnum.UploadFiles,
		UserActionEnum.GetMyFileInfo,
		UserActionEnum.DeleteMyFileInfo
	]),
	[UserRoleEnum.Admin]: new Set([
		UserActionEnum.GetAnyUserInfo,
		UserActionEnum.GetMyUserInfo,
		UserActionEnum.UpdateAnyUserWuthRoleAdminInfo,
		UserActionEnum.UpdateAnyUserWuthRoleUserInfo,
		UserActionEnum.UpdateMyUserInfo,
		UserActionEnum.GetAnySession,
		UserActionEnum.DeleteAnySession,
		UserActionEnum.DeleteMySession,
		UserActionEnum.GetAnyRegistration,
		UserActionEnum.DeleteAnyRegistration,
		UserActionEnum.GetAnyFileInfo,
		UserActionEnum.GetMyFileInfo
	]),
	[UserRoleEnum.SuperAdmin]: new Set([
		UserActionEnum.GetAnyUserInfo,
		UserActionEnum.GetMyUserInfo,
		UserActionEnum.CreateUser,
		UserActionEnum.UpdateAnyUserInfo,
		UserActionEnum.UpdateAnyUserWuthRoleAdminInfo,
		UserActionEnum.UpdateAnyUserWuthRoleUserInfo,
		UserActionEnum.UpdateMyUserInfo,
		UserActionEnum.GetAnySession,
		UserActionEnum.DeleteAnySession,
		UserActionEnum.DeleteMySession,
		UserActionEnum.GetAnyRegistration,
		UserActionEnum.DeleteAnyRegistration,
		UserActionEnum.GetAnyFileInfo,
		UserActionEnum.GetMyFileInfo,
		UserActionEnum.DeleteAnyFileInfo,
		UserActionEnum.DeleteMyFileInfo
	])
}

export function checkIsUserHasAccessToAction(user: IUser, action: UserActionEnum): boolean {
	return userRoleActionMapping[user.role].has(action)
}
