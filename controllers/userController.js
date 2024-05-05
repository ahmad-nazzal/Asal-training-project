import User from "../models/user.js";

async function addUser(req,res)
{
  try {
    const user= new User(req.body)
    const result = await user.save()
    res.status(201).send(result)
  } catch (error) {
    res.status(404).send(error)
  }
    
}

async function getUsers(req,res)
{
  try {
    const users = await User.find()
    if(!users)
      res.status(404).send("there are no users")
    res.status(200).send(users)
    
  } catch (error) {
    res.status(404).send(error)
  }

}

async function updateUser(req,res)
{
  try {
    const filter = {_id : req.params._id}
    const update = req.body
    const updatedUser= await User.findOneAndUpdate(filter, update, {new : true})
    res.status(200).send(updatedUser)
    
  } catch (error) {
    res.status(404).send(error)
  }
}

async function deleteUser(req,res)
{
  const _id = req.params._id
  try {
    const deletedUser = await User.findOneAndDelete({_id: _id})
    if(deletedUser)
      res.status(200).send(deletedUser)
    else
      res.status(404).send(`there is no user with an id ${_id}`)
    
  } catch (error) {
    res.status(404).send(error)
  }


}


export {
  addUser,
  getUsers,
  updateUser,
  deleteUser
}