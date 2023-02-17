const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/users.routes')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/fetchUsers', userRouter)

app.get('/', (req, res) => res.send('API Works!'))

mongoose.connect(process.env.URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening to http://localhost:${process.env.PORT}`);
    })
})
