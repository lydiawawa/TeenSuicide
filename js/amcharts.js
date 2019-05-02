//Round bar chart -------------------------------

function roundBar() {

	// Themes begin
	//am4core.useTheme(am4themes_frozen);
	am4core.useTheme(am4themes_animated);
	// Themes end


	var chart = am4core.create("chartdiv", am4charts.XYChart);
	chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
	// Modify chart's colors
	chart.colors.list = [
		am4core.color("#9E519F"),
		am4core.color("#ABB1BC"),
		am4core.color("#D2D2D1"),
		am4core.color("#8E97AD"),
		am4core.color("#6E86B4"),
		am4core.color("#0079BB"),
	];

	chart.data = [{
		"Demo_Var": "Female",
		"Count": 533,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "Male",
		"Count": 260,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "0 < 13 years",
		"Count": 9,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "14 years",
		"Count": 102,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "15 years",
		"Count": 195,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "16 years",
		"Count": 200,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "17 years",
		"Count": 187,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "18 years + ",
		"Count": 100,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "AI/AN",
		"Count": 20,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "AIAN/White",
		"Count": 19,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "Asian",
		"Count": 27,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "Black",
		"Count": 175,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "Black/White",
		"Count": 17,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "NH/OPI",
		"Count": 14,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "White",
		"Count": 481,
		"Status": "Attempted Suicide"
	}, {
		"Demo_Var": "Other",
		"Count": 40,
		"Status": "Attempted Suicide"
	}];


	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.dataFields.category = "Demo_Var";
	categoryAxis.renderer.minGridDistance = 40;
	categoryAxis.renderer.labels.template.rotation = 270;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

	var series = chart.series.push(new am4charts.CurvedColumnSeries());
	series.dataFields.categoryX = "Demo_Var";
	series.dataFields.valueY = "Count";
	series.tooltipText = "Count: {Count} [BR/] Demographic Variable: {Demo_Var}";
	series.tooltip.pointerOrientation = "vertical";
	series.columns.template.strokeOpacity = 0;

	series.columns.template.fillOpacity = 0.75;

	var hoverState = series.columns.template.states.create("hover");
	hoverState.properties.fillOpacity = 1;
	hoverState.properties.tension = 0.4;

	chart.cursor = new am4charts.XYCursor();


	// Add distinctive colors for each column using adapter
	series.columns.template.adapter.add("fill", (fill, target) => {
		return chart.colors.getIndex(target.dataItem.index);
	});

	chart.scrollbarX = new am4core.Scrollbar();


} // end am4core.ready()



//Funnel graph -----------------------------------------------

function funnelChart() {

	// Themes begin
	am4core.useTheme(am4themes_frozen);
	am4core.useTheme(am4themes_animated);
	// Themes end

	var chart = am4core.create("chartdiv1", am4charts.SlicedChart);
	chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
	/*	
	chart.colors.list = [
	  am4core.color("#9E519F"),
	  am4core.color("#ABB1BC"),
	  am4core.color("#D2D2D1"),
	  am4core.color("#8E97AD"),
	  am4core.color("#6E86B4"),
	  am4core.color("#0079BB"),
	];*/



	chart.data = [{
		"Cause of Death": "Uninentional Injury",
		"Count": 13441,
		"Age": "15-24"
	}, {
		"Cause of Death": "Suicide",
		"Count": 6252,
		"Age": "15-24"
	}, {
		"Cause of Death": "Homicide",
		"Count": 4905,
		"Age": "15-24"
	}, {
		"Cause of Death": "Malignant Neoplasms",
		"Count": 1374,
		"Age": "15-24"
	}, {
		"Cause of Death": "Heart Disease",
		"Count": 913,
		"Age": "15-24"
	}, {
		"Cause of Death": "Congenital Anomalies",
		"Count": 355,
		"Age": "15-24"
	}, {
		"Cause of Death": "Diabetes",
		"Count": 248,
		"Age": "15-24"
	}, {
		"Cause of Death": "Influenza & Pneumonia ",
		"Count": 190,
		"Age": "15-24"
	}, {
		"Cause of Death": "CLRD",
		"Count": 188,
		"Age": "15-24"
	}, {
		"Cause of Death": "Complicated Pregnancy",
		"Count": 168,
		"Age": "15-24"
	}];

	var series = chart.series.push(new am4charts.FunnelSeries());
	//series.colors.step = 1;
	series.dataFields.value = "Count";
	series.dataFields.category = "Cause of Death";
	series.alignLabels = true;

	series.labelsContainer.paddingLeft = 15;
	series.labelsContainer.width = 300;

	//series.orientation = "horizontal";
	//series.bottomRatio = 1;


	//chart.legend = new am4charts.Legend();
	//chart.legend.position = "left";
	//chart.legend.valign = "bottom";
	//chart.legend.margin(5,5,20,5);

} // end am4core.ready()



//Circle chart1 ================================================

function circleChart1() {

	// Themes begin
	am4core.useTheme(am4themes_frozen);
	am4core.useTheme(am4themes_animated);
	// Themes end



	// Create chart instance
	var chart = am4core.create("chartdiv2", am4charts.RadarChart);

	// Add data
	chart.data = [{
		"category": "Suicide resulted in injury",
		"value": 2.95,
		"full": 100,
		"cal": "234/793",
	}, {
		"category": "Attempted suicide",
		"value": 7.42,
		"full": 100,
		"cal": "793/10686",
	}, {
		"category": "None missing response",
		"value": 72,
		"full": 100,
		"cal": "10686/14765"
	}];

	chart.colors.list = [
		am4core.color("#9E519F"),
		am4core.color("#ABB1BC"),
		am4core.color("#D2D2D1"),
		am4core.color("#8E97AD"),
		am4core.color("#6E86B4"),
		am4core.color("#0079BB"),
	];


	// Make chart not full circle
	chart.startAngle = -90;
	chart.endAngle = 180;
	chart.innerRadius = am4core.percent(20);

	// Set number format
	chart.numberFormatter.numberFormat = "#.#'%'";

	// Create axes
	var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.grid.template.strokeOpacity = 0;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.fontWeight = 500;
	categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
		return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
	});
	categoryAxis.renderer.minGridDistance = 10;

	var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeOpacity = 0;
	valueAxis.min = 0;
	valueAxis.max = 100;
	valueAxis.strictMinMax = true;

	// Create series
	var series1 = chart.series.push(new am4charts.RadarColumnSeries());
	series1.dataFields.valueX = "full";
	series1.dataFields.categoryY = "category";
	series1.clustered = false;
	series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
	series1.columns.template.fillOpacity = 0.08;
	series1.columns.template.cornerRadiusTopLeft = 20;
	series1.columns.template.strokeWidth = 0;
	series1.columns.template.radarColumn.cornerRadius = 20;

	var series2 = chart.series.push(new am4charts.RadarColumnSeries());
	series2.dataFields.valueX = "value";
	series2.dataFields.categoryY = "category";
	series2.clustered = false;
	series2.columns.template.strokeWidth = 0;
	series2.columns.template.tooltipText = "{category}: [bold]{value}[/] {cal}";
	series2.columns.template.radarColumn.cornerRadius = 20;

	series2.columns.template.adapter.add("fill", function (fill, target) {
		return chart.colors.getIndex(target.dataItem.index * 3);
	});

	// Add cursor
	chart.cursor = new am4charts.RadarCursor();

} // end am4core.ready()

//Circle chart2 ========================================================

function circleChart2() {

	// Themes begin
	am4core.useTheme(am4themes_frozen);
	am4core.useTheme(am4themes_animated);
	// Themes end



	// Create chart instance
	var chart = am4core.create("chartdiv3", am4charts.RadarChart);

	// Add data
	chart.data = [{
		"category": "Suicide resulted in injury",
		"value": 2.19,
		"full": 100,
		"cal": "(234/10686)"
	}, {
		"category": "Attempted suicide",
		"value": 7.42,
		"full": 100,
		"cal": "(793/10686)"
	}, {
		"category": "Made plan",
		"value": 13.3,
		"full": 100,
		"cal": "(1429/10686)"
	}, {
		"category": "Thoughts of suicide",
		"value": 16.9,
		"full": 100,
		"cal": "(1804/10686)"
	}];



	// Make chart not full circle
	chart.startAngle = -90;
	chart.endAngle = 180;
	chart.innerRadius = am4core.percent(20);

	// Set number format
	chart.numberFormatter.numberFormat = "#.#'%'";

	// Create axes
	var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.grid.template.strokeOpacity = 0;
	categoryAxis.renderer.labels.template.horizontalCenter = "right";
	categoryAxis.renderer.labels.template.fontWeight = 500;
	categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
		return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
	});
	categoryAxis.renderer.minGridDistance = 10;

	var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.strokeOpacity = 0;
	valueAxis.min = 0;
	valueAxis.max = 100;
	valueAxis.strictMinMax = true;

	// Create series
	var series1 = chart.series.push(new am4charts.RadarColumnSeries());
	series1.dataFields.valueX = "full";
	series1.dataFields.categoryY = "category";
	series1.clustered = false;
	series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
	series1.columns.template.fillOpacity = 0.08;
	series1.columns.template.cornerRadiusTopLeft = 20;
	series1.columns.template.strokeWidth = 0;
	series1.columns.template.radarColumn.cornerRadius = 20;

	var series2 = chart.series.push(new am4charts.RadarColumnSeries());
	series2.dataFields.valueX = "value";
	series2.dataFields.categoryY = "category";
	series2.clustered = false;
	series2.columns.template.strokeWidth = 0;
	series2.columns.template.tooltipText = "{category}: [bold]{value}[/] {cal}";
	series2.columns.template.radarColumn.cornerRadius = 20;

	series2.columns.template.adapter.add("fill", function (fill, target) {
		return chart.colors.getIndex(target.dataItem.index + 1);
	});

	// Add cursor
	chart.cursor = new am4charts.RadarCursor();

} // end am4core.ready()// JavaScript Document






//Stacked and grouped bar demo gender============

function genderStacked() {

	// Themes begin
	am4core.useTheme(am4themes_frozen);
	// Themes end

	// Create chart instance
	var chart = am4core.create("demoGender1", am4charts.XYChart);

	chart.colors.list = [
		am4core.color("#9E519F"),
		am4core.color("#ADBCCC"),
		am4core.color("#874487"),
		am4core.color("#869CB3"),

	];

	// Add data
	chart.data = [{
		"Attempt Suicide": "1 time",
		"attemptf": 294,
		"attemptm": 119,
		"injuryf": 81,
		"injurym": 29
	}, {
		"Attempt Suicide": "2 or 3 times",
		"attemptf": 181,
		"attemptm": 78,
		"injuryf": 52,
		"injurym": 24
	}, {
		"Attempt Suicide": "4 or 5 times",
		"attemptf": 28,
		"attemptm": 21,
		"injuryf": 14,
		"injurym": 7
	}, {
		"Attempt Suicide": "6 or more times",
		"attemptf": 30,
		"attemptm": 42,
		"injuryf": 16,
		"injurym": 21
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "Attempt Suicide";
	categoryAxis.title.text = "Number of attmpted suicide";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 20;
	categoryAxis.renderer.cellStartLocation = 0.1;
	categoryAxis.renderer.cellEndLocation = 0.9;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.min = 0;
	//valueAxis.title.text = "Count";

	// Create series
	function createSeries(field, name, stacked) {
		var series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = field;
		series.dataFields.categoryX = "Attempt Suicide";
		series.name = name;
		series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
		series.stacked = stacked;
		series.columns.template.width = am4core.percent(95);
	}
	createSeries("injuryf", "Female injured from suicide", false);
	createSeries("attemptf", "Female attempt suicide", true);
	createSeries("injurym", "Male injured from suicide", false);
	createSeries("attemptm", "Male attempt suicide", true);


	// Add legend
	chart.legend = new am4charts.Legend();
	chart.legend.position = "right";

} // end am4core.ready()


//Stacked and grouped bar demo Age============

function ageStacked() {

	// Themes begin
	am4core.useTheme(am4themes_frozen);
	// Themes end

	// Create chart instance
	var chart = am4core.create("demoAge1", am4charts.XYChart);

	chart.colors.list = [
		am4core.color("#9E519F"),
		am4core.color("#ADBCCC"),
		am4core.color("#874487"),
		am4core.color("#869CB3"),

	];

	// Add data
	chart.data = [{
		"Attempt Suicide": "1 time",
		"0 < 13 years": 1,
		"14 years": 50,
		"15 years": 94,
		"16 years": 109,
		"17 years": 106,
		"18 years +": 53,
		"0 < 13 yearsI": 0,
		"14 yearsI": 12,
		"15 yearsI": 20,
		"16 yearsI": 25,
		"17 yearsI": 18,
		"18 yearsI+": 15
	}, {
		"Attempt Suicide": "2 or 3 times",
		"0 < 13 years": 1,
		"14 years": 38,
		"15 years": 82,
		"16 years": 63,
		"17 years": 52,
		"18 years +": 23,
		"0 < 13 yearsI": 1,
		"14 yearsI": 9,
		"15 yearsI": 30,
		"16 yearsI": 13,
		"17 yearsI": 14,
		"18 yearsI+": 9
	}, {
		"Attempt Suicide": "4 or 5 times",
		"0 < 13 years": 1,
		"14 years": 6,
		"15 years": 7,
		"16 years": 16,
		"17 years": 12,
		"18 years +": 7,
		"0 < 13 yearsI": 0,
		"14 yearsI": 4,
		"15 yearsI": 6,
		"16 yearsI": 6,
		"17 yearsI": 3,
		"18 yearsI+": 2
	}, {
		"Attempt Suicide": "6 or more times",
		"0 < 13 years": 6,
		"14 years": 8,
		"15 years": 12,
		"16 years": 12,
		"17 years": 17,
		"18 years +": 17,
		"0 < 13 yearsI": 4,
		"14 yearsI": 3,
		"15 yearsI": 5,
		"16 yearsI": 5,
		"17 yearsI": 7,
		"18 yearsI+": 13
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "Attempt Suicide";
	categoryAxis.title.text = "Number of attmpted suicide";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 20;
	categoryAxis.renderer.cellStartLocation = 0.1;
	categoryAxis.renderer.cellEndLocation = 0.9;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.min = 0;
	//valueAxis.title.text = "Count";

	// Create series
	function createSeries(field, name, stacked) {
		var series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = field;
		series.dataFields.categoryX = "Attempt Suicide";
		series.name = name;
		series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
		series.stacked = stacked;
		series.columns.template.width = am4core.percent(95);
	}
	createSeries("0 < 13 yearsI", "0 < 13 years injured", false);
	createSeries("0 < 13 years", "0 < 13 years attempted", true);
	createSeries("14 yearsI", "14 years injured", false);
	createSeries("14 years", "14 years attempted", true);
	createSeries("15 yearsI", "15 years injured", false);
	createSeries("15 years", "15 years attempted", true);
	createSeries("16 yearsI", "16 years injured", false);
	createSeries("16 years", "16 years attempted", true);
	createSeries("17 yearsI", "17 years injured", false);
	createSeries("17 years", "17 years attempted", true);
	createSeries("18 yearsI+", "18 years+ injured", false);
	createSeries("18 years +", "18 years+ attempted", true);


	// Add legend
	chart.legend = new am4charts.Legend();
	//chart.legend.position = "right";

} // end am4core.ready()

//Stacked and grouped bar demo Race ============

function raceStacked() {

	// Themes begin
	am4core.useTheme(am4themes_frozen);
	// Themes end

	// Create chart instance
	var chart = am4core.create("demoRace1", am4charts.XYChart);

	chart.colors.list = [
		am4core.color("#9E519F"),
		am4core.color("#ADBCCC"),
		am4core.color("#874487"),
		am4core.color("#869CB3"),

	];

	// Add data
	chart.data = [{
		"Attempt Suicide": "1 time",
		"AI/AN": 10,
		"AIAN/White": 9,
		"Asian": 13,
		"Black": 81,
		"Black/White": 11,
		"NH/OPI": 6,
		"White": 258,
		"Other": 25,
		"AI/ANI": 3,
		"AIAN/WhiteI": 1,
		"AsianI": 4,
		"BlackI": 18,
		"Black/WhiteI": 4,
		"NH/OPII": 0,
		"WhiteI": 59,
		"OtherI": 11
	}, {
		"Attempt Suicide": "2 or 3 times",
		"AI/AN": 10,
		"AIAN/White": 8,
		"Asian": 8,
		"Black": 60,
		"Black/White": 3,
		"NH/OPI": 5,
		"White": 156,
		"Other": 9,
		"AI/ANI": 3,
		"AIAN/WhiteI": 2,
		"AsianI": 2,
		"BlackI": 19,
		"Black/WhiteI": 3,
		"NH/OPII": 2,
		"WhiteI": 41,
		"OtherI": 4
	}, {
		"Attempt Suicide": "4 or 5 times",
		"AI/AN": 0,
		"AIAN/White": 1,
		"Asian": 2,
		"Black": 16,
		"Black/White": 1,
		"NH/OPI": 1,
		"White": 27,
		"Other": 1,
		"AI/ANI": 0,
		"AIAN/WhiteI": 1,
		"AsianI": 2,
		"BlackI": 6,
		"Black/WhiteI": 1,
		"NH/OPII": 1,
		"WhiteI": 10,
		"OtherI": 0
	}, {
		"Attempt Suicide": "6 or more times",
		"AI/AN": 0,
		"AIAN/White": 1,
		"Asian": 4,
		"Black": 18,
		"Black/White": 2,
		"NH/OPI": 2,
		"White": 40,
		"Other": 5,
		"AI/ANI": 0,
		"AIAN/WhiteI": 1,
		"AsianI": 1,
		"BlackI": 11,
		"Black/WhiteI": 1,
		"NH/OPII": 2,
		"WhiteI": 18,
		"OtherI": 3
	}];

	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "Attempt Suicide";
	categoryAxis.title.text = "Number of attmpted suicide";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 20;
	categoryAxis.renderer.cellStartLocation = 0.1;
	categoryAxis.renderer.cellEndLocation = 0.9;

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.min = 0;
	//valueAxis.title.text = "Count";

	// Create series
	function createSeries(field, name, stacked) {
		var series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.valueY = field;
		series.dataFields.categoryX = "Attempt Suicide";
		series.name = name;
		series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
		series.stacked = stacked;
		series.columns.template.width = am4core.percent(95);
	}
	createSeries("AI/ANI", "American Indian or Alaska Native injured", false);
	createSeries("AI/AN", "American Indian or Alaska Native attempted", true);
	createSeries("AIAN/WhiteI", "AIAN/White injured", false);
	createSeries("AIAN/White", "AIAN/White attempted", true);
	createSeries("AsianI", "Asian injured", false);
	createSeries("Asian", "Asian attempted", true);
	createSeries("BlackI", "Black injured", false);
	createSeries("Black", "Black attempted", true);
	createSeries("Black/WhiteI", "Black/White injured", false);
	createSeries("Black/White", "Black/White attempted", true);
	createSeries("NH/OPII", "Native Hawaiian or Other Pacific Islander injured", false);
	createSeries("NH/OPI", "Native Hawaiian or Other Pacific Islander attempted", true);
	createSeries("WhiteI", "White injured", false);
	createSeries("White", "White attempted", true);
	createSeries("OtherI", "Other injured", false);
	createSeries("Other", "Other attempted", true);

	// Add legend
	chart.legend = new am4charts.Legend();
	//chart.legend.position = "right";

} // end am4core.ready()

//raceStacked();
//ageStacked();
//genderStacked();
//circleChart2();
//circleChart1();
//funnelChart();
//roundBar();
