const UserSchema = require('../../models/loginSchema');

module.exports = {
    post: async (req, res, next) => {
        const typedElements = {
            name: req.body.name,
            password: req.body.password
        }
        try {
            const checkIfSame = await UserSchema.find(typedElements);
            if (checkIfSame.length) {
                res.status(200).json({
                    mess:'Pomyslnie zalogowano'
                });
            } else {
                res.status(200).json({
                    mess: 'Podano bledny nick lub haslo'
                })
            }
        } catch (err) {
            res.status(500).json({
                mess: err
            })
        }
    },
    get$: async (req, res, next) => {
        try {
            const findAll = await UserSchema.find().exec();
            res.status(200).json(findAll)
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    },
    register: async (req, res, next) => {
        const user = new UserSchema({
            name: req.body.name,
            password: req.body.password
        })
        try {
            const savedUser = await user.save()
            res.status(200).json(savedUser);
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }

    }
}