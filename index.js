const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Import Connection
const connection = require('./database/Connection');

//Database connection    //Seccess
connection.authenticate().then(() => console.log('Database connected'))
                        //Error
                         .catch((error) => console.log(`Connection erro: ${error}`))

//View engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.render('index')
});

app.listen(666, () => {
    console.log(`Server started on port: 666`);
});