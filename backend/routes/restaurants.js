// routes/restaurants.js
const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// POST: Create a new restaurant
router.post('/', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        res.status(400).send({ error: `Validation failed: ${error.message}` });
    }
});

// GET: Retrieve all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});

// GET: Retrieve a specific restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ error: "Restaurant not found" });
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});

// PUT: Update restaurant details
router.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!restaurant) {
            return res.status(404).send({ error: "Restaurant not found" });
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send({ error: `Validation failed: ${error.message}` });
    }
});

// DELETE: Remove a restaurant
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ error: "Restaurant not found" });
        }
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});

module.exports = router;