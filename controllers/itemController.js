import mongoose from "mongoose";
import Item from "../models/item.js";

async function addItem(req,res)
{
    const item= new Item(req.body)
    const result = await item.save()
    res.send(result)
    
}
function getItemById(req,res)
{

}
function updateItem(req,res)
{

}
function deleteItem(req,res)
{
    
}


export {
  addItem,
  getItemById,
  updateItem,
  deleteItem
}