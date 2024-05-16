import {User} from "../models/user.js";


class UserService{

  
  async create(userBody: object): Promise<any>
  {
      const user= new User(userBody)
      await user.save()
      return {
        message: "user addedd successfully",
        id: user._id
      }
  }
  
  async getAll(): Promise<object>
  {    
    const users = await User.find()
    return users
  }
  
  async update(userId: string,updatedValues: object): Promise<string>
  {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedValues, {new : true})
    if(!updatedUser){
      return "User not found"
    }
    return "user updated successfully"
  }
  
  async delete(userId: string): Promise<string>
  {
    const deletedUser = await User.findByIdAndDelete(userId)
    if(!deletedUser)
      return "User not found"
    else
      return "user deleted successfully"
  }

}


export default UserService