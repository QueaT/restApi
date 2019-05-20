const OrderSchema = require('../../models/ordersSchema');
const express = require('express');
const router = express.Router();


module.exports = {
    get$: async (req, res, next) => {
        try {
            const orders = await OrderSchema.find().select('name price count').exec()
            if (orders.length) res.status(200).json(orders);
            else res.status(401).json({
                error: 'Brak danych'
            })
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    },
    post$: async (req, res, next) => {
        const orderSchema = new OrderSchema({
            name: req.body.name,
            price: req.body.price,
            count: req.body.count
        })
        const savedOrder = await orderSchema.save();
        try {
            res.status(200).json(savedOrder)
        } catch (err) {
            res.status(401).json({
                error: err
            })
        }
    },
    getById: async (req, res, next) => {
        const id = req.params.orderId;
        try {
            const foundElement = await OrderSchema.findById(id);
            res.status(200).json(foundElement);
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    },
    deleteById: async (req, res, next) => {
        const id = req.params.orderId;
        try {
            const elementToDelete = await OrderSchema.remove({
                _id: id
            })
            res.status(200).json({deletedCount: elementToDelete.deletedCount});
        } catch (err) {
            res.status(404).json({
                error: err.message
            })
        }
    }
}