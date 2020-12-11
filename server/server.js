const AppRouter = require('./routes/AppRouter');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const AWSservice = require('./middleware/AWSservice')
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();
// Require Middleware
const logger = require('morgan');
const helmet = require('helmet')
// Require Middleware
// Initialize Middlewarenpx dt
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.disable('X-Powered-By')
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(helmet({ contentSecurityPolicy: false }))


// Initialize Middleware
app.get('/', (req, res) => res.send({ msg: 'Server Working' }));
app.use('/api', AppRouter);
app.listen(PORT, async () => {
    try {
        AWSservice.init()
        console.log(`App listening on port: ${PORT}`);
    } catch (error) {
        throw new Error('Connection Error');
    }
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
)