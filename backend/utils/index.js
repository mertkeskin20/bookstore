import mongoose from "mongoose";

const isValidObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Object id is not valid" });
  }
};

const findDocumentById = async (model, id,res) => {
    try {
        const document = await model.findById(id);

        if (!document) {
            res.status(400).json({error: `The ${model.modelName} does not exist!`});
            return null;
        }
        return document;
    
    } catch (error) {
    console.error(`Error while finding ${model.modelName} by ID`, error);
    return res.status(500).json({error: 'Internaş Server error'});    
    }
    ;
}

export { isValidObjectId, findDocumentById };
