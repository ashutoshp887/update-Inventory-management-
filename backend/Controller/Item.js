
import ItemSchema from "../Model/ItemSchema.js"

export const addItem= async(req,res)=>{
    try{
const{  Name,Unit,Rate,Quantity}= req.body;
const createIteam = new ItemSchema({
    Name:Name,
    Unit:Unit,
    Rate:Rate,
    Quantity:Quantity
})
const saveIteam = await createIteam.save();
res.status(201).json(saveIteam)

    }catch(error){
res.status(500).json({message:"Something went wrong",error: error.message})
    }
}


export const updatequantity =async(req,res)=>{
    try{
        const {Quantity}= req.body;
        const item = await ItemSchema.findById(req.params.id);
        if(!item){
            return res.status(404).json({message:"Item not found"});
        }
        item.Quantity = Quantity;
        const updatedItem = await item.save();
        res.status(200).json(updatedItem);

    }catch(error){
        res.status(500).json({message:"Something went wrong",error: error.message})
    }
}

export const getAllItems = async (req, res) => {
  try {
    const items = await ItemSchema.find(); // MongoDB me sabhi items fetch karega
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};