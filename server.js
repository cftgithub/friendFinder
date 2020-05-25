var express = require("express");

// Sets up Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets Express for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// Starts the server to begin listening. Place below all code
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
