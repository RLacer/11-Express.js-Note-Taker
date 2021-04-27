const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// routes will go here

// require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// start the server
app.listen(PORT, () => {
    console.log('Server started! At http://localhost:' + PORT);
});
