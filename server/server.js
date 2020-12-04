const AppRouter = require('./routes/AppRouter');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')


const PORT = process.env.PORT || 3001;
const app = express();
// Require Middleware
const logger = require('morgan');
// Require Middleware
// Initialize Middlewarenpx dt
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Initialize Middleware
app.get('/', (req, res) => res.send({ msg: 'Server Working' }));
app.use('/api', AppRouter);
app.listen(PORT, async () => {
    try {
        console.log(`App listening on port: ${PORT}`);
    } catch (error) {
        throw new Error('Connection Error');
    }
});