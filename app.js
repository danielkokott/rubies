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
		
		var recurring = [
			{
				"month": "01",
				"data": []
			},
			{
				"month": "02",
				"data": []
			},
			{
				"month": "03",
				"data": []
			},
			{
				"month": "04",
				"data": []
			},
			{
				"month": "05",
				"data": []
			},
			{
				"month": "06",
				"data": []
			},
			{
				"month": "07",
				"data": []
			},
			{
				"month": "08",
				"data": []
			},
			{
				"month": "09",
				"data": []
			},
			{
				"month": "10",
				"data": []
			},
			{
				"month": "11",
				"data": []
			},
			{
				"month": "12",
				"data": []
			},
		];
		
		var account = {
			"account": "danielkokott",
			"start_saldo": 67516.19,
			"recurring": recurring
		};

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
	fs.readFile(filename, 'utf-8', function (err, data) {
  		if (err) {
    		throw err;
  		}

  		var poster = data.split("\n")
  		.filter(invalidNordeaCsvLine)
  		.map(parseNordeaCsvLine)
  		.sort(newestPostFirst);

		callback(poster);
	})

	function invalidNordeaCsvLine(value, index, array) {
		return !(value === '' || value === '\r' || value.indexOf('Saldo') > 0);
	}

	function parseNordeaCsvLine(value, index, array) {
		var fields = value.split(";");
		var date = fields[0].split("-");
		return {
			"date": date[1] + "-" + date[0] + "-" + date[2],
			"text": fields[1],
			"amount": parseCustomNumber(fields[3]),
			"saldo": parseCustomNumber(fields[4])
 		};
	}

	function tet(value, index, array) {
		var year = new Date(value.date).getYear() + 1900;
		if (!this.some(isYear)) {
			this.push({year: year});
		}
	}

	function isYear(value, index, array) {
		return value.year === year;
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