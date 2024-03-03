import { expect, test } from 'bun:test'

import { checkIsUserHasAccessToAction } from '@/utils'

import { UserActionEnum, UserRoleEnum, UserStatusEnum } from '@/models'
import type { IUser } from '@/models'

test('Проверяет что checkIsUserHasAccessToAction работает на самом простом примере', () => {
	const user: IUser = {
		id: 1,
		email: 'test@test.ru',
		role: UserRoleEnum.User,
		status: UserStatusEnum.Active
	}

	expect(checkIsUserHasAccessToAction(user, UserActionEnum.GetMyUserInfo)).toBeTruthy()
})
