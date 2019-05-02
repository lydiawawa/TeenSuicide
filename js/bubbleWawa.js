//BMI bubble ==============================================

function BMIbubble(dataset, chartArea, toolTip) {

  var interval;
  
  
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("");  


var width = 560,
    height = 520,
    padding = 4, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 20;

var color = d3.scale.ordinal()
      .range(["#ADBCCC", "#C172C2", "#0079BB", "#9E519F", "#6E86B4",  "#D2D2D1","#516c9e"]);

var radiusScale = d3.scale.sqrt().domain([1, 2192]).range([1, 20])

d3.text(dataset, function(error, text) {
  if (error) throw error;
  var colNames = "text,size,group\n" + text;
  var data = d3.csv.parse(colNames);

  data.forEach(function(d) {
    d.size = +d.size;
  });


//unique cluster/group id's
var cs = [];
data.forEach(function(d){
        if(!cs.contains(d.group)) {
            cs.push(d.group);
        }
});
console.log(cs)
var n = data.length, // total number of nodes
    m = cs.length; // number of distinct clusters

//create clusters and nodes
var clusters = new Array(m);
var nodes = [];
for (var i = 0; i<n; i++){
    nodes.push(create_nodes(data,i));
}
console.log(nodes)
var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.02)
    .charge(0)
    .on("tick", tick)
    .start();

var svg = d3.select(chartArea).append("svg")
    .attr("width", width)
    .attr("height", height);


console.log(data)
var node = svg.selectAll("circle")
    .data(nodes)

    .enter().append("g").call(force.drag)
    .on("mouseover", function(d) {
    
    tooltip.html(d.group + "<br><br> BMI: " + + d3.format("0.2f")(d.size) + toolTip + d.text);
    tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
   return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


node.append("circle")
    .style("fill", function (d) {
    return color(d.cluster);
    })
    .attr("r", function(d){return d.radius})
 
		
    

node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle");
     // .text(function(d) { return d.text.substring(0, d.radius / 3); });



var group =[]

function create_nodes(data,node_counter) {
  var i = cs.indexOf(data[node_counter].group),
    
      r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
      d = {
        size: data[node_counter].size,
        cluster: i,
        group: data[node_counter].group,
        radius: radiusScale(data[node_counter].size)*1.5,
        text: data[node_counter].text,
        x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
        y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
      }

  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
   console.log(d);
  return d;
};



function tick(e) {
    node.each(cluster(2 * e.alpha * e.alpha))
        .each(collide(.5))
     //.attr("cx", function(d) { return d.x; })
     //     .attr("cy", function(d) { return d.y-50; });
    .attr("transform", function (d) {
      var k = "translate(" + d.x + "," + d.y + ")";
      return k;
   })

}

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
    return function (d) {
        var cluster = clusters[d.cluster];
        if (cluster === d) return;
        var x = d.x - cluster.x,
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + cluster.radius;
        if (l != r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            cluster.x += x;
            cluster.y += y;
        }
    };
}

// Resolves collisions between d and all other circles.
function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function (d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                if (l < r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}
 
  
  
 
});





Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};
  
}// BMIbubble


// Google Chart

//load google charts
		google.charts.load('current', {'packages':['corechart']});
		//google.charts.load('current', {'packages':['corechart']});
        //google.charts.setOnLoadCallback(drawChart);
		
		//load the callback function that runs when page loads
		google.charts.setOnLoadCallback(drawAllSheets);

        function drawAllSheets(){
			drawSheetName('BMI',
						  'SELECT A,B,C,D,E',
						 bubBMIRace);

		}//drawAllSheets

        		//column starts with 0 header starts with 1
		function drawSheetName(sheetName, query, responseHandler) {
		var queryString = encodeURIComponent(query);
			var query = new google.visualization.Query(
			'https://docs.google.com/spreadsheets/d/1z4dI7COb6F-RZA-2NPvPjip9PChfY15bXK0sYLPxeDY/gviz/tq?sheet=' + sheetName + '&headers=1&tq=' + queryString);
			
			https://docs.google.com/spreadsheets/d/1-NwogHiqjRPfIEeh7XxgDYj1CIjyzrz7hxYus4I2VQY/
			query.send(responseHandler);
		}//drawSheetName

		
	function bubBMIRace(response) {
				var data = response.getDataTable();
				var options = {
					 chartArea:{
                                   top: 60,
								   left: 50,
							       bottom: 60,
							       right: 30,
                                   width: '100%',
                                   height: '800',},
					    width: '100%',
                        height: '800',
					   	backgroundColor: {
          									fill: '#F5F5F5'
											
						},
				       legend: {position:'top', maxLines: 2}, 
					   title: 'Teen Suicides Resulted in Injury - exploring Race + Gender + BMI',
					   hAxis: {title: 'Race',
							       viewWindowMode:'explicit',
            				viewWindow: {
											max:9,
										    min:0
							}},
					   vAxis: {title: 'BMI',
							    viewWindowMode:'explicit',
							   	viewWindow:{
									max:110,
									min:-1
              						}
							  },
					   bubble: {textStyle: 
								{fontSize: 9},
							   opacity:0.5},
					
					  colors: ["#ADBCCC", "#C172C2", "#0079BB", "#9E519F", "#6E86B4",  "#D2D2D1","#516c9e"]
					  
			};
			
			/*var chart = new google.charts.Line(
				document.getElementById('EducationGrowth_div'));
			chart.draw(data, google.charts.Line.convertOptions(options));*/
			
			var chart = new google.visualization.BubbleChart(
				document.getElementById('bubBMIRace_div'));
			chart.draw(data, options);
		} //edupercOfGDPCapita	





//googleBubble ========================

BMIbubble("data/bubbleChart1.csv", "#bubbleChartRace", "<br/>Gender: ");
BMIbubble("data/bubbleChart2.csv", "#bubbleChartGender", "<br/>Race: ");