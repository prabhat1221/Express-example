const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')

const app = express();


//init middle ware
app.use(logger);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index',
        {
            title: 'appppp',
            members
        })
})

//set static path
app.use(express.static(path.join(__dirname, 'public')))
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })
// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/about.html'));
// })

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});