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
		parseNordeaCvs('./data/poster.csv', function(data) {
			response.send(data);
		})
	} else {
		response.sendfile('./data/' + request.params.id + '.json');	
	}
});

function parseNordeaCvs(filename, callback) {
	var fs = require('fs');
	fs.readFile(filename, 'utf-8', function (err, data) {
  		if (err) {
    		throw err
  		}
  		var poster = {}
  		var temp1 = data.split("\n");
		for (var i = 0; i < temp1.length; i++) {
			if (temp1[i] !== '' && temp1[i] !== '\r') {
				var temp2 = temp1[i].split(";");
				if (temp2[4] !== 'Saldo') {
					var temp3 = temp2[0].split("-");
					var year = temp3[2];
					var month = temp3[1];
					if (poster[year] === undefined) {
						poster[year] = {};
					}
					if (poster[year][month] === undefined) {
						poster[year][month] = [];
					}

 					poster[year][month].push({
		 				"date": temp3[1] + "-" + temp3[0] + "-" + temp3[2],
		 				"text": temp2[1],
		 				"amount": parseCustomNumber(temp2[3]),
		 				"saldo": parseCustomNumber(temp2[4])
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