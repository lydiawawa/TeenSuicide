//data comes in through data.js which has all the variables.

//color function determines the color
//you can add more colors based on your data
//alternatively you can have an interpolation or other means of choosing the color
/*
function color(d, i, type, length) {

	//create an array of colors depending on names
	if (type == '') {
		var colors = [{
				name: 'Male',
				fill: '#0079BB'
			}, {
				name: 'Female',
				fill: '#9E519F'
			}, {
				name: '0 < 13 years',
				fill: '#ABB1BC'
			},

			{
				name: '14 years',
				fill: '#D2D2D1'
			}, {
				name: '15 years',
				fill: '#8E97AD'
			}, {
				name: '16 years',
				fill: '#6E86B4'
			}, {
				name: '17 years',
				fill: '#0079BB'
			}, {
				name: '18 years',
				fill: '#9E519F'
			},
		];


		var findcolor = colors.find((c) => c.name === d);
		var fill = findcolor.fill
		return fill
	} else if (type == 'race') {
		//var colorExtra = d3.scale.category20(); 
		// var colorExtra = d3.schemeCategory20; //add
		//console.log(colorExtra);
		//var fill = colorExtra[i]; //add
		//console.log(d);

		//var colorExtra = d3.scaleLinear()
		//.domain([1,20])//the length helps to create the scale by setting the domain
		//.range(['#0079BB','#c792c8' ,'#9E519F'])
		//.interpolate(d3.interpolateHcl);
		//var fill = colorExtra(i);

		//the length and the index i is used to calculate the color
		var colorExtra = d3.scaleOrdinal()
			.domain(d3.range(0, length)) //the length helps to create the scale by setting the domain
			.range(d3.schemeCategory20b); //the range is the array which produces 20 colors
		//after 20 colors the colors are repeated as there are only 20 colors in the array for d3.schemCategory20
		var fill = colorExtra(i);
		return fill
	}
}

//some drawing variables which will be used repeatedly
var margin = {
	left: 40,
	right: 40,
	top: 40,
	bottom: 40
};
var width = 400 - margin.top - margin.bottom,
	height = 400 - margin.left - margin.right;
var radius = Math.min(width, height) / 2;
var donutWidth = 55;
var legendRectSize = 18; // NEW
var legendSpacing = 4; // NEW  

// Define the div for the tooltip
var tooltipdiv = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);


//init() adds event listeners to the button to pass the data
function init() {
	d3.select("#gender")
		.on("click", function (d, i) {
			pieChart(gender, 'gender') //pass the data and the key
		})
	d3.select("#age")
		.on("click", function (d, i) {
			pieChart(age, 'Age')
		})
	d3.select("#race")
		.on("click", function (d, i) {
			//num = document.getElementById("num").value
			pieChart(race, 'race_code')
		})

	pieChart(gender, 'gender') //creates default pie-chart
}

init(); //calls init() on load



//creates the piechart with the data and the key
function pieChart(data, key) {
	//empty the div - wipe the slate clean to create a new pie chart
	d3.select('#pie-chart-area').html('');
	var n = data.length / 2;
	// create the svg
	var svg = d3.select("#pie-chart-area")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr('perserveAspectRatio', 'xMinYMid') //new
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	//define arc
	var arc = d3.arc()
		.innerRadius(radius - donutWidth)
		.outerRadius(radius - 20);
	// second arc for labels
	var arc2 = d3.arc()
		.outerRadius(radius)
		.innerRadius(radius + 20);

	// import pie chart and data
	var pie = d3.pie()
		.sort(null)
		.startAngle(1.1 * Math.PI) //new
		.endAngle(3.1 * Math.PI) //new
		.value(function (d) {
			return d.count;
		});


	//add legend
	var legendHolder = svg.append('g')
		// translate the holder to the right side of the graph
		.attr('transform', "translate(" + -30 + "," + 160 + ")")
		.attr('class', 'legendHolder')

	var legendG = legendHolder.selectAll(".legend")
		.data(pie(data))
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function (d, i) {
			var height = legendRectSize + legendSpacing; // NEW
			var offset = 13 * pie(data).length / 2; // NEW
			var horz = 12 * legendRectSize; // NEW
			var vert = -i * height - offset - 25; // NEW
			return 'translate(' + horz + ',' + vert + ')';
		})
		.style("opacity", "0");



	legendG.append("rect")
		.attr("width", legendRectSize)
		.attr("height", legendRectSize)
		.style("fill", function (d, i) {
			if (key === "race_code") {
				return color(d.data[key], i, 'race', data.length) //if type of key is race 
			} else {
				return color(d.data[key], i, ''); //for all other types of keys
			}
		});

	legendG.append("text")
		.attr('x', legendRectSize + legendSpacing) // NEW
		.attr('y', legendRectSize - legendSpacing)
		.text(function (d) {
			return d.data[key];
		})
		.style("font-size", 12);
	//.attr("y", 10)
	//.attr("x", 11);
	legendG.transition().duration(500).delay(function (d, i) {
		return 1100 + 100 * i;
	}).style("opacity", "1");

	//append the arcs based on the data
	var g = svg.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class", "arc")
		.attr('d', arc)

	//draw the paths
	g.append("path")
		.style("fill", function (d, i) {
			if (key === "race_code") {
				return color(d.data[key], i, 'race', data.length) //if type of key is race 
			} else {
				return color(d.data[key], i, ''); //for all other types of keys
			}
		})
		.transition().delay(function (d, i) {
			return i * 300;
		}).duration(300)
		.ease(d3.easeLinear)
		.attrTween('d', function (d) {
			var i = d3.interpolate(d.startAngle, d.endAngle);
			return function (t) {
				d.endAngle = i(t);
				return arc(d);
			};
		})
		.each(function (d) {
			this._current = d;
		}); // store the initial values

	//g.append("text")
	//.attr("transform", function(d) { return "translate(" + arc2.centroid(d) + ")"; })
	//.attr("dy", ".35em")
	//.attr("class", "d3-label")
	//.style("text-anchor", "middle")
	//.text(function(d) { return d.data[key]; });

	//Append to the tooltip div on mouseover
	var sum = d3.sum(data, (d) => d.count);
	g.on("mouseover", function (d) {
			tooltipdiv.transition()
				.duration(200)
				.style("opacity", .9);
			tooltipdiv.html(d.data[key] + "<br>" + "N: " + d.data.count + "<br>" + percentage(d.data.count, sum, 2) + "%")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function (d) {
			tooltipdiv.transition()
				.duration(500)
				.style("opacity", 0);
		});



}

//takes number and sum and returns percentage rounded to digits d
function percentage(num, sum, d) {
	var p = (num / sum) * 100;
	var digits = Math.pow(10, d);
	return (Math.round(p * digits)) / digits;
}

*/




//Cluster chart ============================================

function clusterChart(chartArea) {

	var width = 800,
		height = 500,
		maxRadius = 12;
	//empty the div - wipe the slate clean to create a new pie chart



	var n = 200, // total number of circles
		m = 9; // number of distinct clusters

	var color = d3.scaleOrdinal()
		.domain(m)
		.range(d3.schemeCategory20b);

	// The largest node for each cluster.
	var clusters = new Array(m);
	console.log(clusters);

	var nodes = d3.range(n).map(function () {
		var i = Math.floor(Math.random() * m),
			r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
			d = {
				cluster: i,
				radius: r
			};
		if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
		return d;
	});

	var forceCollide = d3.forceCollide()
		.radius(function (d) {
			return d.radius + 1.5;
		})
		.iterations(1);

	var force = d3.forceSimulation()
		.nodes(nodes)
		.force("center", d3.forceCenter())
		.force("collide", forceCollide)
		.force("cluster", forceCluster)
		.force("gravity", d3.forceManyBody(30))
		.force("x", d3.forceX().strength(.7))
		.force("y", d3.forceY().strength(.7))
		.on("tick", tick);

	var svg = d3.select(chartArea).append("svg")
		.attr("width", width)
		.attr("height", height)
		.append('g')
		.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

	var circle = svg.selectAll("circle")
		.data(nodes)
		.enter().append("circle")
		.attr("r", function (d) {
			return d.radius;
		})
		.style("fill", function (d) {
			return color(d.cluster);
		})

	//    TODO: Update for v4
	//    .call(force.drag);

	function tick() {
		circle
			.attr("cx", function (d) {
				return d.x;
			})
			.attr("cy", function (d) {
				return d.y;
			});
	}

	function forceCluster(alpha) {
		for (var i = 0, n = nodes.length, node, cluster, k = alpha * 1; i < n; ++i) {
			node = nodes[i];
			cluster = clusters[node.cluster];
			node.vx -= (node.x - cluster.x) * k;
			node.vy -= (node.y - cluster.y) * k;
		}
	}
}



clusterChart("#cluster-chart");
