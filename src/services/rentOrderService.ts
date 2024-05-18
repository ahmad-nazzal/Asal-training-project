import Item from "../models/item.js";


class RentService {

  async rentItem(userId: string, itemId: string, returnDate?: Date): Promise<string>
  {
    const item = await Item.findById(itemId)
    if(!item)
      return "Item not found"
    if(!item.available)
      return "Item not available"
    if(item.type === "sale")
      return "Item is not for rentting just for selling"
    
    item.rent.push({
      user_id: userId,
      rentedAt: new Date(),
      return_date: returnDate
    })

    item.available = false
    await item.save()
    return "Item rented successfully"
  }
  
  
}



export default RentService