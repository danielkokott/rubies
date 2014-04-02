var express = require("express");
var app = express();
app.use(express.logger());

app.use("/", express.static("./bootstrap-3.1.1-dist"));
app.use("/", express.static("./client"));
app.get('/', function(request, response) {
	response.sendfile('./client/index.html');
});


app.get('/account/:id', function(request, response) {
	if (request.params.id === 'test') {
		
		var account = require('./data/recur.json');

		parseNordeaCsv('./data/poster.csv', function(data) {
			account.transactions = data;
			response.send(account);
		});
	} else {
		response.sendfile('./data/' + request.params.id + '.json');	
	}
});

function parseNordeaCsv(filename, callback) {
	var fs = require('fs');
	fs.readFile(filename, {encoding: 'utf8'}, function (err, data) {
  		if (err) {
    		throw err;
  		}

  		var poster = data.split("\n")
  		.filter(invalidNordeaCsvLine)
  		.map(parseNordeaCsvLine);
  		//.sort(newestPostFirst);

		callback(poster);
	})

	function invalidNordeaCsvLine(value, index, array) {
		return !(value === '' || value === '\r' || value.indexOf('Saldo') > 0);
	}

	function parseNordeaCsvLine(value, index, array) {
		console.log("TÆST");
 		console.log(value);
		var fields = value.split(";");
		var date = fields[0].split("-");
		return {
			"year": parseInt(date[2]),
			"month": parseInt(date[1]) - 1,
			"orgdate": fields[0],
			"text": fields[1],
			"amount": parseCustomNumber(fields[3]),
			"saldo": parseCustomNumber(fields[4])
 		};
	}

	function newestPostFirst(a, b) {
		aDate = Date.parse(a.date);
		bDate = Date.parse(b.date);
		if (aDate > bDate) { return -1; }
		if (aDate < bDate) { return 1; }
		return 0;
	}

	function parseCustomNumber(number) {
		return parseFloat(number.replace(',','.'));
	}
}

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Server listening on http://localhost:" + port)
});