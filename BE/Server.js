const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});
const Item = mongoose.model('Item', itemSchema);

const joiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const { error } = joiSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
});

app.delete('/api/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
