import Item from "../models/item.js";


class ItemService {

  async create(itemBody: object): Promise<string>
  {
      const item= new Item(itemBody)
      await item.save()
      return "item addedd successfully"
  }
  
  async getAll(): Promise<object>
  {
      const items = await Item.find()
      return items
  }
  
  async update(itemId: string,updatedValues: object): Promise<string>
  {
      const updatedItem = await Item.findByIdAndUpdate(itemId, updatedValues, {new : true})
      if(!updatedItem){
        return "Item not found"
      }
      return "Item updated successfully"
  }
  
  async delete(itemId: string): Promise<string>
  {
      const deletedItem=await Item.findByIdAndDelete(itemId)
      if(!deletedItem)
        return "Item not found"
      else
        return "Item deleted successfully"
  }
  
  async getItemsForUser(email: string, username: string) {
    const items =["dd"]
    return items
  }
}



export default ItemService