import cloudinary from '~/libs/cloudinary'
import User from '~/models/user.model'

export const updateProfileUser = async (profilePic: string, userId: string) => {
  const uploadResponse = await cloudinary.uploader.upload(profilePic, {
    folder: 'chat-app'
  })
  const uploadUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

  return uploadUser
}
