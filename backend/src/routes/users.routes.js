const { Router } = require('express');
const userModel = require('../models/user.model');
const axios = require('axios')


const app = Router();


app.get('/userdetails', async (req, res) => {
    const { page = 1, filter = '', limit = 10 } = req.query
    try {

        const users = await userModel.aggregate([
            { $match: filter ? { 'gender': filter } : {} },
            { $skip: +(limit * (+page - 1)) },
            { $limit: +limit }
        ])
        
        return res.status(200).send(users)

    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.get('/', async (req, res) => {

    try {
        let r = await axios('https://randomuser.me/api/?results=50')
        await userModel.insertMany(r.data.results)
        res.status(201).send('Data saved successfully!')
    } catch (e) {
        return res.status(501).send(e.message)
    }
})

app.delete('/', async (req, res) => {
    try {
        await userModel.deleteMany()
        res.status(200).send('Data deleted successfully!')
    } catch (e) {
        return res.status(501).send(e.message)
    }
})


module.exports = app;