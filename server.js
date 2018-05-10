var express  = require("express"),
    favicon  = require('serve-favicon'),
    app      = express(),
    port     = process.env.PORT || 3000,
    path       = require('path');



app.use(express.static(__dirname + '/public'));
app.use("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.use(favicon(path.join(__dirname,'public', 'favicon.ico')));

app.listen(port);

console.log('app server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
