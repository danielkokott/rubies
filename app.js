var express = require("express");
var app = express();
app.use(express.logger());

app.use("/", express.static("./bootstrap-3.1.1-dist"));
app.use("/", express.static("./client"));
app.get('/', function(request, response) {
	response.sendfile('./client/index.html');
});


app.get('/data/:id', function(request, response) {
	if (request.params.id === 'poster') {
		response.sendfile('./data/poster.csv');	
	} else {
		console.log(request.params["id"]);
		response.sendfile('./data/' + request.params["id"] + '.json');	
	}
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Server listening on http://localhost:" + port)
});