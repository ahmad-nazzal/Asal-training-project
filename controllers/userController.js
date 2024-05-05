import User from "../models/user.js";

async function addUser()
{
    const user= new User(req.body)
    await user.save()
    return "user addedd successfully"
}

async function getUsers()
{
  const users = await User.find()
  return users

}

async function updateUser(userId,updatedValues)
{
  const updatedUser = await User.findByIdAndUpdate(userId, updatedValues, {new : true})
  if(!updatedUser){
    return "User not found"
  }
  return "user updated successfully"
}

async function deleteUser(userId)
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