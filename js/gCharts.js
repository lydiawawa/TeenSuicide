// Google Chart

//load google charts
google.charts.load('current', {
	'packages': ['corechart']
});
//google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(drawChart);

//load the callback function that runs when page loads
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {
	drawSheetName('suicide',
		'SELECT A,B',
		suicideStateHandler);
	drawSheetName('genderRatio',
		'SELECT A,B,C,D',
		suicideGenderRate);


} //drawAllSheets

//column starts with 0 header starts with 1
function drawSheetName(sheetName, query, responseHandler) {
	var queryString = encodeURIComponent(query);
	var query = new google.visualization.Query(
		'https://docs.google.com/spreadsheets/d/1z4dI7COb6F-RZA-2NPvPjip9PChfY15bXK0sYLPxeDY/gviz/tq?sheet=' + sheetName + '&headers=1&tq=' + queryString);

	https: //docs.google.com/spreadsheets/d/1-NwogHiqjRPfIEeh7XxgDYj1CIjyzrz7hxYus4I2VQY/
		query.send(responseHandler);
} //drawSheetName




function suicideStateHandler(response) {
	var data = response.getDataTable();

	var options = {
		height: '100%',
		width: 800,
		colorAxis: {
			colors: ['#C2DEF2', '#2A55BD']
		}, //orange to blue
		region: 'US',
		resolution: 'provinces',
		title: 'Suicide Rate by State ',
		backgroundColor: {
			fill: '#F5F5F5'

		},
	};
	var chart = new google.visualization.GeoChart(
		document.getElementById('suicidestate_div'));
	chart.draw(data, options);

} // suicideStateHandler

function suicideGenderRate(response) {
	var data = response.getDataTable();
	var options = {
		height: '100%',
		width: 950,
		isStacked: true,
		hAxis: {
			title: 'Year',
			slantedText: true,
			slantedTextAngle: 45,
		},
		vAxis: {
			minValue: 0
		},

		// colorAxis: {colors: ['#C2DEF2','#2A55BD']},
		colors: ['#ADBCCC', '#9E519F', '#0079BB'],
		pointSize: 10,
		backgroundColor: {
			fill: '#F5F5F5'

		},
		//title: 'Age-Adjusted Suicide Rates in the United States (2001-2017)'
	};

	var chart = new google.visualization.AreaChart(
		document.getElementById('suicidesgender_div'));
	chart.draw(data, options);


} // totalSpendingbyCountryResponseHandler
