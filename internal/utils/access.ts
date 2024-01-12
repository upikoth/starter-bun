import { UserActionEnum, UserRoleEnum } from '@/models'
import type { IUser } from '@/models'

const userRoleActionMapping: Record<UserRoleEnum, Set<UserActionEnum>> = {
	[UserRoleEnum.User]: new Set([
		UserActionEnum.GetMyUserInfo,
		UserActionEnum.UpdateMyUserInfo,
		UserActionEnum.DeleteMySession
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
		UserActionEnum.DeleteAnyRegistration
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
		UserActionEnum.DeleteAnyRegistration
	])
}

export function checkIsUserHasAccessToAction(user: IUser, action: UserActionEnum): boolean {
	return userRoleActionMapping[user.role].has(action)
}
