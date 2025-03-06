import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { createGroupService } from '~/services/group.service'

export const createGroup = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, memberIds, adminId } = req.body

  const group = await createGroupService(name, memberIds, adminId)

  res.status(201).json(group)
})
