import User from "../models/user.js";

async function addUser(userBody: object)
{
    const user= new User(userBody)
    await user.save()
    return "user addedd successfully"
}

async function getUsers()
{
  const users = await User.find()
  return users

}

async function updateUser(userId: string,updatedValues: object)
{
  const updatedUser = await User.findByIdAndUpdate(userId, updatedValues, {new : true})
  if(!updatedUser){
    return "User not found"
  }
  return "user updated successfully"
}

async function deleteUser(userId: string)
{
  const deletedUser = await User.findByIdAndDelete(userId)
  if(!deletedUser)
    return "User not found"
  else
    return "user deleted successfully"
}


export {
  addUser,
  getUsers,
  updateUser,
  deleteUser
}