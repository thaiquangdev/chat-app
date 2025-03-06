import Group from '~/models/group.model'
import { IUser } from '~/models/user.model'

export const createGroupService = async (name: string, memberIds: IUser[], adminId: IUser) => {
  const group = new Group({
    name,
    members: memberIds,
    adminId
  })

  await group.save()

  return group
}
