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
		parseNordeaCsv('./data/poster.csv', function(data) {
			response.send(data);
		})
	} else {
		response.sendfile('./data/' + request.params.id + '.json');	
	}
});

function parseNordeaCsv(filename, callback) {
	var fs = require('fs');
	fs.readFile(filename, 'utf-8', function (err, data) {
  		if (err) {
    		throw err
  		}
  		var poster = {}
  		var lines = data.split("\n");
		for (var i = 0; i < lines.length; i++) {
			if (lines[i] !== '' && lines[i] !== '\r') {
				var values = lines[i].split(";");
				if (values[4] !== 'Saldo') {
					var date = values[0].split("-");
					var year = date[2];
					var month = date[1];
					if (poster[year] === undefined) {
						poster[year] = {};
					}
					if (poster[year][month] === undefined) {
						poster[year][month] = [];
					}

 					poster[year][month].push({
		 				"date": date[1] + "-" + date[0] + "-" + date[2],
		 				"text": values[1],
		 				"amount": parseCustomNumber(values[3]),
		 				"saldo": parseCustomNumber(values[4])
			 		});
 				}
	    	}
	    }
		callback({"start_saldo": 67516.19, "poster": poster});
	})

	function parseCustomNumber(number) {
		return parseFloat(number.replace(',','.'));
	}
}

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Server listening on http://localhost:" + port)
});