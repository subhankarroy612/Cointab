const { Router } = require('express');
const userModel = require('../models/user.model');


const app = Router()

app.get('/', async (req, res) => {

    try {
        let r = await fetch('https://randomuser.me/api/?results=50')
            .then((r) => r.json()).catch((e) => console.log(e.message))
        r = r.results
        await userModel.insertMany(r)
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