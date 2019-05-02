//Group bar chart  =======================================


//=========Simple Bar========//
function simpleBarGroup(chartArea, democat,dataset){
d3.select(chartArea).html('');
	var margin = {top: 35, right: 145, bottom: 85, left: 45},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var tooltipdiv = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

var x0 = d3.scaleBand()
    .rangeRound([0, width]).padding(0.2);

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x0)
    .tickSize(0)
	.tickPadding(10);

var yAxis = d3.axisLeft(y).ticks(null, "s").tickSize(-width);
  

var color = d3.scaleOrdinal()
    .range(["#9E519F","#ADBCCC", "#0079BB",  "#6d7fcc", "#C172C2", "#D2D2D1","#516c9e"]);

var svg = d3.select(chartArea).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.attr("class", "axis axis--y");


d3.csv(dataset, function(error, data) {
  if (error) throw error;
 
   // Format the data
  data.forEach(function(d) {
     d.demo_cat = d.demo_cat;
     d.s_category = d.s_category;
  });
  
  

  var categoriesNames = data.map(function(d) { return d.s_category; }).sort(function(a,b){
	  return  d3.ascending(a, b)});
  var rateNames = data.map(function(d) { return d.demo_cat; }).sort(function(a,b){return d3.ascending(a, b)});

  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
  
  const nestedData = d3.nest()
  	.key(function(d){return d.s_category})
    .key(function(d){return d.demo_cat})
    .rollup(function(leaves) { return leaves.length; })
  	.entries(data);
console.log(nestedData);
//console.log(x0);
 
  y.domain([0, d3.max(nestedData, function(demo_cat) { 
      return d3.max(demo_cat.values, 
                    function(d) { 
                        return d.value; }); })]).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y ais")
      .style('opacity','0')
      .call(yAxis)
  
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Count");
	
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width - 300)
    .attr("y", height + margin.top + 10 )
          .text("Number of Suicide Attempts");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
	



  var cat2 = nestedData.key;
  //var sum = d3.sum(data, (d) => d.count);
  var slice = svg.selectAll(".slice")
      .data(nestedData)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });
 // var cat2 = slice.attr("d", function(d){return d.values}); 
 // console.log(cat2);
  
  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  
  .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { return x1(d.key); })
    	
      .style("fill", function(d) { return color(d.key) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          const parentData = d3.select(this.parentNode).datum();
          d3.select(this).style("fill", d3.rgb(color(d.key)).darker(1));
          tooltipdiv.transition().duration(200).style("opacity", .9);
          tooltipdiv.html(democat + d.key +"<br>" +"<strong>Suicide Attempt: </strong> " +parentData.key+ "<br>" +"<strong>Count: </strong>" + d.value)	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.key));
         tooltipdiv.transition()		
          .duration(500)		
          .style("opacity", 0);	
      });
  
  

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
  
  
  
  
    //Legend
  var legend = svg.selectAll(".legend")
  //console.log(data[0]);
 //.data((function(nestedData) { return nestedData.key }))
  .data(nestedData[0].values.map(function(d) { return d.key; }).sort(function(a,b){return a - b}))
    //  .data(nestedData.values.map(function(d) { return d.key; })).reverse()
  //console.log(.data(nestedData.values.map(function(d) { return d.key; })).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 30)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(600).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");


  
});
  
  	
}


// Grouped bar ========================================
function groupBar(chartArea, cat,checkbox, clickThis,dataset,tooltipcat,colnum) {
var tooltipdiv = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);
  
var formatValue = d3.format(",d");
//var padding1 =100;

var margin = {top: 35, right: 145, bottom: 85, left: 45},
    width = 750 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  
var g = d3.select(chartArea).append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

let x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1),
    x1 = d3.scaleBand(),
    y = d3.scaleLinear().rangeRound([height, 0]);

let xAxis = d3.axisBottom(x0).tickPadding(10),
    yAxis = d3.axisLeft(y).ticks(null, "s").tickSize(-width);


g.select('.y').transition().duration(500).delay(1300).style('opacity','1');
  
g.append("g")
  .attr("class","axis axis--x")
  .attr("transform", "translate(0," + height + ")");

g.append("g")
  .attr("class", "axis axis--y");
 //title
//    g.append("text")
//            .attr("x", (width / 2))             
//            .attr("y", 0 - (margin.top / 2))
//            .attr("text-anchor", "middle")  
//            .style("font-size", "16px") 
//            .style("text-decoration", "underline")  
//            .text(titleAdd);

    //x label
    g.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top +5 )
          .text("Number of Suicide Attempts");


    //y label
    g.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top+ 30)
          .text("Count");

	

var z = d3.scaleOrdinal()
  .range(["#ADBCCC", "#0079BB", "#9E519F", "#6E86B4", "#C172C2", "#D2D2D1","#516c9e"]);

var durations = 0;
  
let afterLoad = () => durations = 750;

var catInt, keys, copy, sortIndex;

var keysLegend = [];

d3.queue()
  .defer(d3.csv, dataset, function(d, i, columns) {
      for (var i = 1, ttl = 0, n = columns.length; i < n; ++i) 
        ttl += d[columns[i]] = +d[columns[i]];
        d.total = ttl;
        return d;
    })
  .await(ready);
	
  function ready(error, data) {
  if (error) throw error;

  d3.select(cat).on('change', update);
  d3.select(checkbox).on('change', update); // Sort checkbox

  init();
  update();

  function init() {
    sortIndex = data.map( function(d) { return d.suicideN} );
  }

  function update() {

    // ======== Initial/Sliced values ========

    catInt = d3.select(cat).property("value");
    console.log(catInt);

    keys = data.columns.slice(1, colnum);

    copy = [];
    console.log(keys);
     console.log(catInt);
    
    keys.forEach(function(t) {
      t = t.slice(0, -1)
       console.log(t)
      copy.push(t)
     
    })

    var copyKeys = keys;
    
     console.log(copyKeys);

    keysLegend = []

    copyKeys.forEach(function(s) {
      s = s.slice(0, -1)
      keysLegend.push(s + catInt)
         console.log(keysLegend)
    })
    
     console.log(copyKeys);

    data.forEach(function(d, i, columns) {
      for (var i = 1, test = 0, n = keysLegend.length; i < n; ++i) 
        test += d[keysLegend[i]] = +d[keysLegend[i]];
        d.totalSlice = test;
        console.log("Group Total: ", d.totalSlice)
        return d;
    })

   
    // ======== Domain, Axis & Sort ========
  
    y.domain([0, d3.max(data, function(d) {
      return d3.max(copy, function(key) {
        return d[key+catInt];
        }); 
      })
    ]).nice();

    g.selectAll(".axis.axis--y").transition()
      .duration(durations)
      .call(yAxis);

    var barGroups = g.selectAll(".layer") // Bargroups initialized here for proper sorting
      .data(data, function(d){return d.suicideN});

    barGroups.enter().append("g")
      .classed('layer', true);

    barGroups.exit().remove();
    
    data.sort( d3.select(checkbox).property("checked")
      ? function(a, b) { return b.totalSlice - a.totalSlice; }
      : function(a, b) { return sortIndex.indexOf(a.suicideN) - sortIndex.indexOf(b.suicideN);});

    x0.domain(data.map(function(d) { return d.suicideN; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);

    g.selectAll(".axis.axis--x").transition()
      .duration(durations)
      .call(xAxis);

    // ======== Grouped bars ========
    
    g.selectAll(".layer").transition().duration(durations)
      .attr("transform", function(d, i) {
        return "translate(" + x0(d.suicideN) + ",0)";
      });
    
    let bars = g.selectAll(".layer").selectAll("rect")
      .data(function(d) {
        return copy.map(function(key) {
          return {key: key+catInt, value: d[key+catInt]};
        }); 
      });
    
      //g.selectAll("rect")
      //.transition()
      //.delay(function (d) {return Math.random()*1000;})
      //.duration(1000)
      //.attr("y", function(d) { return y(d.value); })
      //.attr("height", function(d) { return height - y(d.value); });

    bars = bars
      .enter()
    .append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { return x1(d.key); })
      .attr("fill", function(d) { return z(d.key); })
      .merge(bars)
      .on("mouseover", function(d) {
      var newKey = d.key.slice(0,-1);
      tooltipdiv.transition().duration(200).style("opacity", .9);
      tooltipdiv.html(tooltipcat + newKey + "<br>" +"<strong>Count: </strong>" + d["value"])	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
         // d3.select(this).style("fill", color(d.key));
         tooltipdiv.transition()		
          .duration(500)		
          .style("opacity", 0);	
      });


    bars.transition().duration(durations)
      .attr("y", function(d) { return y(d["value"]); })
      .attr("height", function(d) { return height - y(d["value"]); });

    // ======== Grouped bar text ========

    let textOnBar = g.selectAll(".layer").selectAll("text")
      .data(function(d) {
        return copy.map(function(key) {
          return {key: key+catInt, value: d[key+catInt]};
        });
      });

    textOnBar = textOnBar
      .enter()
    .append("text")
      .attr("fill","#fff")
      .attr("font-size",12)
      .merge(textOnBar);

    textOnBar.transition().duration(durations)
      .attr("transform", function(d, i) {
        let x0 = x1.bandwidth() * i + 7,
            y0 = y(d.value) + 8;
        return "translate(" + x0 + "," + y0 + ") rotate(90)";
      })
      .text(function(d) {return formatValue(d.value)})

    // ======== Legend rects ========

    var legend = g.selectAll(".legend")
      .data(keysLegend);

    legend = legend
      .enter()
    .append("rect")
      .attr("class","legend")
      .attr("transform", function(d, i) { 
        return "translate(0," + i * 40 + ")"; 
      })
      .attr("x", width + 17)
      .attr("width", 15)
      .attr("height", 15)
      .attr("stroke-width",2)
      .on("click",function(d) { 
        console.log(d)
        updateLegend(d) 
      })
      .merge(legend)

    legend.transition().duration(durations)
      .attr("fill", z)
      .attr("stroke", z);

    // ======== Legend text ========

    var legendText = g.selectAll(".legendText")
      .data(keysLegend);

    legendText = legendText
      .enter()
    .append("text")
      .attr("class","legendText")
      .attr("transform", function(d, i) { 
        return "translate(0," + i * 40 + ")"; 
      })
      .attr("x", width + 40)
      .attr("font-size",12)
      .attr("y", 8)
      .attr("dy", "0.32em")
      .merge(legendText);

    legendText.transition().duration(durations)
      .text(function(d) { 
        var sliceLegend = d.slice(0, -1)
        return sliceLegend; 
      });

  } // End of update function

  
  var filtered = [];

  // Function by Andrew Reid 
  // @link: https://bl.ocks.org/andrew-reid/64a6c1892d1893009d2b99b8abee75a7

  function updateLegend(d) {

    d3.select(clickThis).style("display","none")
   
    if (filtered.indexOf(d) == -1) {
      filtered.push(d); 

      if(filtered.length == keysLegend.length) filtered = [];
    }

    else {
      filtered.splice(filtered.indexOf(d), 1);
    }

    var newKeys = [];
    keysLegend.forEach(function(d) {
      if (filtered.indexOf(d) == -1 ) {
        newKeys.push(d);
      }
    })

    x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);

    y.domain([0, d3.max(data, function(d) { 
      return d3.max(keysLegend, function(key) { 
        if (filtered.indexOf(key) == -1) 
          return d[key]; 
        }); 
      })
    ]).nice();
    
    g.select(".axis--y")
      .transition()
      .duration(durations/1.5)
      .call(yAxis);

    var barsLegend = g.selectAll(".layer").selectAll("rect")
      .data(function(d) { 
        return keysLegend.map(function(key) { 
          return {key: key, value: d[key]}; 
        }); 
      })
    
    barsLegend.filter(function(d) {
         return filtered.indexOf(d.key) > -1;
      })
      .transition()
      .duration(durations/1.5)
      .attr("x", function(d) {
        return (+d3.select(this).attr("x")) + 
               (+d3.select(this).attr("width"))/2;  
      })
      .attr("height",0)
      .attr("width",0)     
      .attr("y", function(d) { return height; });
      
    barsLegend.filter(function(d) {
        return filtered.indexOf(d.key) == -1;
      })
      .transition()
      .duration(durations/1.5)
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("fill", function(d) { return z(d.key); });

    var barsLegendText = g.selectAll(".layer").selectAll("text")
      .data(function(d) { 
        return keysLegend.map(function(key) { 
          return {key: key, value: d[key]}; 
        }); 
      })
    
    barsLegendText.filter(function(d) {
         return filtered.indexOf(d.key) > -1;
      })
      .transition()
      .duration(durations/1.5)
      .attr("transform", function(d, i) {
        let x0 = x1.bandwidth() * i + 7,
            y0 = y(d.value) + 8;
        return "translate(" + x0 + "," + y0 + ") rotate(90)";
      })
      .text("");
      
    barsLegendText.filter(function(d) {
        return filtered.indexOf(d.key) == -1;
      })
      .transition()
      .duration(durations/1.5)
      .attr("transform", function(d, i) {
        let x0 = x1.bandwidth() * i + 7,
            y0 = y(d.value) + 8;
        return "translate(" + x0 + "," + y0 + ") rotate(90)";
      })
      .text(function(d) {return formatValue(d.value)})
    
    g.selectAll(".legend")
      .transition()
      .duration(100)
      .attr("fill",function(d) {
        if (filtered.length) {
          if (filtered.indexOf(d) == -1) {
            return z(d); 
          } else { 
            return "white"; }
          } else {
          return z(d); 
        }
      });

  } // End of updateLegend

  afterLoad();

} // End of ready	
	
	
	

} //groupBar



simpleBarGroup("#demoGender","<strong>Gender: </strong>","data/demoGender.csv");
simpleBarGroup("#demoAge","<strong>Age: </strong>","data/demoAge.csv");
simpleBarGroup("#demoRace","<strong>Race: </strong>","data/demoRace.csv");


/*
groupBar("#group-bar-fight", 
		 "#categoryFight", 
		 "#sortCheckboxFight",
		 ".clickThisFight",
		 "data/Q17fight.csv", 
		 "<strong>Fights: </strong>",
		 8)
groupBar("#group-bar-gun", 
		 "#categoryGun", 
		 "#sortCheckboxGun",
		 ".clickThisGun",
		 "data/q14gun.csv", 
		 "<strong>Days carried guns: </strong>",
		 5)
groupBar("#group-bar-threats", 
		 "#categoryThreat", 
		 "#sortCheckboxThreat",
		".clickThisThreat",
		 "data/q16threats.csv", 
		 "<strong>Threats: </strong>",
		 8)
groupBar("#group-bar-drug1",
	"#categoryDrug1",
	"#sortCheckboxDrug1",
	".clickThisDrug1",
	"data/q91drug.csv",
	"<strong>Drug use: </strong>",
	6)
groupBar("#group-bar-drug2", 
		 "#categoryDrug2", 
		 "#sortCheckboxDrug2",
		".clickThisDrug2",
		 "data/q53drug.csv", 
		 "<strong>Drug use: </strong>",
		 6)
groupBar("#group-bar-smoke1", 
		 "#categorySmoke1", 
		 "#sortCheckboxSmoke1",
		".clickThisSmoke1",
		 "data/q32Smoke.csv", 
		 "<strong>Days smoke: </strong>",
		 7)
groupBar("#group-bar-smoke2", 
		 "#categorySmoke2", 
		 "#sortCheckboxSmoke2",
		".clickThisSmoke2",
		 "data/q33Smoke.csv", 
		 "<strong>Cigarettes per day: </strong>",
		 7)
groupBar("#group-bar-alco1", 
		 "#categoryAlco1", 
		 "#sortCheckboxAlco1",
		".clickThisAlco1",
		 "data/q42alcohol.csv", 
		 "<strong>At least 1 drink of alcohol: </strong>",
		 7)

groupBar("#group-bar-alco2", 
		 "#categoryAlco2", 
		 "#sortCheckboxAlco2",
		".clickThisAlco2",
		 "data/q44alcohol.csv", 
		 "<strong>Days of drinking: </strong>",
		 7)

groupBar("#group-bar-sex", 
		 "#categorySex", 
		 "#sortCheckboxSex",
		".clickThisSex",
		 "data/q21sex.csv", 
		 "<strong>Unwanted sex by partner: </strong>",
		 5)

*/






