const Product = require('../../models/productSchema');


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const product = await Product.find().select('name price').exec()
            res.status(200).json(product);
        } catch (err) {
            throw new Error(err)
        }
    },
    post: async (req, res, next) => {
        const prodSchema = new Product({
            name: req.body.name,
            price: req.body.price
        })
        try {
            const product = await prodSchema.save();
            res.status(201).json({
                message: '/productsPost',
                createdProduct: product
            })

        } catch (err) {
            res.status(404).json({
                error: err
            })
        }
    },
    getWithId: async (req, res, next) => {
        try {
            const id = req.params.productId;
            const foundObj = await Product.findById(id).exec();
            if (foundObj) res.status(200).json(foundObj);
            else res.status(404).json({
                message: 'Brak danych'
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                err: err
            })
        }
    },
    patchWithId: async (req, res, next) => {
        try {
            const id = req.params.productId;
            const updateObj = await Product.update({
                    _id: id
                }, req.body)
                .exec()
            res.status(200).json(updateObj)
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    },
    deleteWithId: async (req, res, next) => {
        try {
            const id = req.params.productId;
            const elementToDelete = await Product.remove({
                    _id: id
                })
                .exec()
            res.status(200).json(elementToDelete);
        } catch (err) {
            res.status(400).json({
                error: err
            })
        }
    }
}