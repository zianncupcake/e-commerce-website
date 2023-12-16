//controller function imports category model from categorymodel.js. interacts with category model to create a new category. handles end points. query database inside controller

const Category = require("../models/CategoryModel") //this is a model of a mongoose schema.

const getCategories = async (req, res, next) => {
    try {
        //find documents in the category collection. {} means no speicifc conditions for the find operation --> retrieve all documents in the category collection
        //orFail is a mongoose method that ensures query returns a result. if no documents match query criteria then it will throw error 
        //just trying to GET the exisiting categories in the database
        const categories = await Category.find({}).sort({name: "asc"}).orFail()
        //server responds with a json representation of the categories using res.json mthod. typically used in an express.js route handler to send a json response to the client
        res.json(categories)
    } catch(error) {
        next(error)
    }
}

const newCategory = async (req, res, next) => {
    try {
        const {category} = req.body //extract category property from req.body object
        if (!category) {
            res.status(400).send("Category input is required")
        }
        const categoryExists = await Category.findOne({name: category}) //findOne is a mongoose function
        if(categoryExists) {
            res.status(400).send("Category already exists")
        } else {
            const categoryCreated = await Category.create({ //mongoose method --> creates a new document instance of the category model with the specified data
                name: category
            })
            res.status(201).send({categoryCreated: categoryCreated})
        }
    } catch(error) {
        next(error)
    }
}

// const encodedString = "Hello%20World%21";
// const decodedString = decodeURIComponent(encodedString);
// console.log(decodedString); // Outputs: "Hello World!"


// const deleteCategory = async (req, res, next) => {
//     try {
//         //make sure category is not default
//         if(req.params.category !== "Choose category") {
//             const categoryExists = await Category.findOne({
//                 name: decodeURIComponent(req.params.category) //decodes category name using this function in case it contains uri encoded characters --> ensure proper transmission of special characters like spaces
//             }).orFail()
//             await categoryExists.remove() // remove from database
//             res.json({categoryDeleted: true}) // json response sent back to client to indicate category successfully deleted
//         }
//     } catch (err) {
//         next(err)
//     }
// }

const deleteCategory = async (req, res, next) => {
    try {
        // Make sure category is not default
        if (req.params.category !== "Choose category") {
            const categoryExists = await Category.findOneAndDelete({
                name: decodeURIComponent(req.params.category) //decodes category name using this function in case it contains uri encoded characters --> ensure proper transmission of special characters like spaces
            });

            if (categoryExists) {
                res.json({ categoryDeleted: true }); // json response sent back to client to indicate category successfully deleted
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        }
    } catch (err) {
        next(err);
    }
}

const saveAttr = async (req, res, next) => {
    console.log(req.body);
    const { key, val, categoryChosen } = req.body;

    if (!key || !val || !categoryChosen) {
        return res.status(400).send("All inputs are required");
    }

    try {
        const category = categoryChosen.split("/")[0];
        const categoryExists = await Category.findOne({ name: category }).orFail();

        // Check if the key already exists in the attrs array
        const existingAttr = categoryExists.attrs.find(item => item.key === key);

        if (existingAttr) {
            // Key exists, update its values. push value to existing array
            existingAttr.value = [...new Set([...existingAttr.value, val])];
        } else {
            // Key doesn't exist, add a new attribute. totally new key + associated value
            categoryExists.attrs.push({ key: key, value: [val] });
        }

        // Save the updated category
        await categoryExists.save();

        // Fetch all categories sorted by name
        const updatedCategories = await Category.find({}).sort({ name: "asc" });

        return res.status(201).json({ categoriesUpdated: updatedCategories });
    } catch (err) {
        next(err);
    }
};



module.exports = {getCategories, newCategory, deleteCategory, saveAttr}
