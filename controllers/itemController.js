import mongoose from "mongoose";
import Item from "../models/item.js";

async function addItem(req,res)
{
  try {
    const item= new Item(req.body)
    const result = await item.save()
    res.status(201).send(result)
  } catch (error) {
    res.status(404).send(error)
  }
    
}

async function getItems(req,res)
{
  try {
    const items = await Item.find()
    if(!items)
      res.status(404).send("there are no items")
    res.status(200).send(items)
    
  } catch (error) {
    res.status(404).send(error)
  }

}

async function updateItem(req,res)
{
  try {
    const filter = {_id : req.params._id}
    const update = req.body
    const updatedItem = await Item.findOneAndUpdate(filter, update, {new : true})
    res.status(200).send(updatedItem)
    
  } catch (error) {
    res.status(404).send(error)
  }
}

async function deleteItem(req,res)
{
  const _id = req.params._id
  try {
    const deletedItem = await Item.findOneAndDelete({_id: _id})
    if(deletedItem)
      res.status(200).send(deletedItem)
    else
      res.status(404).send(`there is no item with an id ${_id}`)
    
  } catch (error) {
    res.status(404).send(error)
  }


}


export {
  addItem,
  getItems,
  updateItem,
  deleteItem
}