import Item from "../models/item.js";
import Rent from "../models/rent.js";


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
    
    const rent = new Rent({
      user_id: userId,
      item_id: itemId,
      rentedAt: new Date(),
      return_date: returnDate
    })
    await rent.save()
    item.available = false
    await item.save()
    return "Item rented successfully"
  }
  
  
}



export default RentService