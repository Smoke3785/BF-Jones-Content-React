console.clear()
// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const colors = require('./config/chalk')
const helperFunctions = require('./functions/helperFunctions')
// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 23572;




// This application level middleware prints incoming requests to the servers console, useful to see incoming requests

app.use((req, res, next) => {
    console.log(colors.highlight(helperFunctions.getTime()) + colors.apiCall(` ${req.method} `) + `${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure the CORs middleware
app.use(cors());

// Require Route
const api = require('./routes/routes');

// Configure app to use route
app.use('/api/v1/', api);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};
// Run through server startup procedures




// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Unspecific request caught.'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(colors.serverInit(`Server running on port ${port}`)));




// module.exports.archiveFiles = helperFunctions.getArchiveFiles('./Yearbooks')



// This is where I put code that I'm using to help folks on Reactiflux

// const isEven =n=> Number.isInteger(n/2);
// console.log(isEven(121))


// let output = {
//     44: 'Older',
//     45: 'Society',
//     1001: 'Government/Balance sheets',
//     1002: 'Government/Employment and remuneration',
//     1000000: 'example'
//   }
//   let x = Object.fromEntries(Object.entries(output).filter((data)=> data[0].length <= 2))
//   console.log(x)

//   fetch(url)
//   .then(res => Promise.all([res.json()]))
//   .then((jsonData) => {
//     console.log(Object.fromEntries(Object.fromEntries(Object.entries(jsonData.subjects).filter(([key]) => key.length <= 2)))
//     );

//   });