import Item from "../models/item.js";

async function addItem(itemBody: object)
{
    const item= new Item(itemBody)
    await item.save()
    return "item addedd successfully"
}

async function getItems()
{
    const items = await Item.find()
    return items
}

async function updateItem(itemId: string,updatedValues: object)
{
    const updatedItem = await Item.findByIdAndUpdate(itemId, updatedValues, {new : true})
    if(!updatedItem){
      return "Item not found"
    }
    return "Item updated successfully"
}

async function deleteItem(itemId: string)
{
    const deletedItem=await Item.findByIdAndDelete(itemId)
    if(!deletedItem)
      return "Item not found"
    else
      return "Item deleted successfully"
}


export {
  addItem,
  getItems,
  updateItem,
  deleteItem
}