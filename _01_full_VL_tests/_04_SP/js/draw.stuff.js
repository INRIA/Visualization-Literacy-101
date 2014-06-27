// ----------- FOR SVG -----------
var _svg_width = 1024,
	_svg_height = 500,
	_svg_padding = [62,50,75,100];

var _svg; // DEFINE SVG GLOBALY

// ----------- FOR BAR CHART -----------
var _x_scale = d3.scale.linear()
	.range([0,_svg_width-_svg_padding[0]-_svg_padding[3]]);

var _y_scale = d3.scale.linear()
	.range([_svg_height-_svg_padding[1]-_svg_padding[2],0]).nice();

// ----------- FOR AXES -----------
var _x_axis_scale = d3.scale.linear()
	.range([0,_svg_width-_svg_padding[0]-_svg_padding[3]]);

var _y_axis_scale = d3.scale.linear()
	.range([0,_svg_height-_svg_padding[1]-_svg_padding[2]]);

var _y_axis = d3.svg.axis()
	.orient("left");

var _x_axis = d3.svg.axis()
	.orient("bottom");

// ----------- FOR BROKEN AXES -----------
var _clamp1_y_axis = d3.svg.axis()
	.orient("left");

var _clamp1_x_axis = d3.svg.axis()
	.orient("bottom");

var _clamp2_y_axis = d3.svg.axis()
	.orient("left");

var _clamp2_x_axis = d3.svg.axis()
	.orient("bottom");


function drawSVG(){
	_svg = d3.select("#chart-container")
	.append("svg")
	.attr("height",_svg_height)
	.attr("width",_svg_width)
	.append("g")
	.attr("transform","translate("+[_svg_padding[0],_svg_padding[1]]+")");

	return null;
};


// CHANGE TO SCATTERPLOT
function drawSCATTERPLOT(data,subset,isBlank,planets,answers,xaxis,yaxis){
	
	/*var _subset = data.slice(-1);

	var _filter_data = new Array();
	_subset.forEach(function(d){	
		var _global_vals = new Object;
		for(var _i=0; _i<subset.length; _i++){
			var _values = new Object;
			var _key = subset[_i];
			_values.ctr = _key;
			_values.val = d[_key];
			_filter_data[_i] = _values;
		};
		return null;
	});*/

	/*var dat1 = _literacy_data.slice();
	var subset = ["NER","LSO","MMR","MDA"]*/

	var _subset = new Array;

	data.forEach(function(d){
		if(subset.indexOf(d.Ctr)!=-1){
			_subset.push(d);
		};
		return null;
	});

	//var _subset = _literacy_data;
	/*var _subset = new Array();
	_literacy_data.forEach(function(d){
		if(d.Literacy<90){
			_subset.push(d)
		}
	})*/

	var _num = 20,
		_chart_width = _svg_width-(_svg_padding[0]+_svg_padding[3]),
		_chart_height = _svg_height-_svg_padding[1]-_svg_padding[2];
		_bar_width = (_chart_width/_num)-2;

	_x_scale.domain([0,d3.max(_subset,function(d){ return +d.Expenditure; })]);
	_x_axis_scale.domain([0,d3.max(_subset,function(d){ return +d.Expenditure; })]);
	_x_axis.scale(_x_axis_scale);

	_y_scale.domain([0,d3.max(_subset,function(d){ return +d.Literacy; })]);
	_y_axis_scale.domain([d3.max(_subset,function(d){ return +d.Literacy; }),0]);
	_y_axis.scale(_y_axis_scale);

	/*_y_scale.domain([d3.min(_subset,function(d){ return +d.Literacy; }),d3.max(_subset,function(d){ return +d.Literacy; })]);
	_y_axis_scale.domain([d3.max(_subset,function(d){ return +d.Literacy; }),d3.min(_subset,function(d){ return +d.Literacy; })]);
	_y_axis.scale(_y_axis_scale);*/

	//_svg
	//.attr("transform","translate(" + [(_svg_width-(_bar_width+2)*_filter_data.length)/2,_svg_padding[1]] + ")");

	// ----------- AXES -----------
	_svg.append("g")
	.attr("class","axis x-axis")
	.call(_x_axis)
	.attr("transform","translate(" + [0,_y_scale(0)] + ")")
    .append("text")
	.attr("y", -16)
	.attr("x",_svg_width-_svg_padding[0]-_svg_padding[3])
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text(xaxis);

	_svg.append("g")
	.attr("class","axis y-axis")
	.call(_y_axis)
    .append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text(yaxis);

	// EXPAND TICKS TO GRID
	d3.select(".x-axis")
	.selectAll(".tick")
	.select("line")
	.attr("y1",6)
	.attr("y2",-_svg_height+_svg_padding[1]+_svg_padding[2])
	.style("stroke","#DDD");

	// EXPAND TICKS TO GRID
	d3.select(".y-axis")
	.selectAll(".tick")
	.select("line")
	.attr("x1",-6)
	.attr("x2",_svg_width-_svg_padding[0]-_svg_padding[3])
	.style("stroke","#DDD");


	// DRAW chart-container
	if(isBlank != "blank"){	
		var _scatterplot = _svg.append("g")
			.attr("class","scatterplot")
			.selectAll(".datum")
			.data(_subset);

		_groups = _scatterplot.enter()
		.append("g")
		.attr("class","datum")
		.attr("transform",function(d,i){
			return "translate(" + [_x_scale(+d.Expenditure),_y_scale(+d.Literacy)] + ")"
		});

		_groups.append("circle")
		.attr("class","point")
		.attr("r",5)
		.style("fill","#006DCC");

		_groups.append("text")
		.text(function(d){ 
			var _idx = subset.indexOf(d.Ctr);
			return planets[_idx];
		})
		.attr("y",5)
		.attr("x",7.5);

	};

	return null;
};


function drawTABLE(data,subset,lgth,title,isBlank,dateFormat,planets,answers){
	var _numCols = 3;
	var parseDate = d3.time.format(dateFormat).parse;

	var _title = d3.select("#chart-container")
		.append("div")
		.attr("class","table-title full-width")
		.html("<i>Table:</i> "+title);

	var _table = d3.select("#chart-container")
		.append("table")
		.attr("class","table table-bordered table-striped table-condensed no-selection")
		.style("width",_numCols*150+"px")
		.style("margin-bottom",function(){
			if(subset.length>10){
				return "30px"
			}else{
				return null;
			}
		});

	var _thead = _table.append("thead");
	var _tbody = _table.append("tbody");

	var _filter_data = new Array(),
		_temp_filter_data = new Array();

	var _subset = data.slice(-1);

	/*_subset.forEach(function(d){
		for(var _i=0; _i<subset.length; _i++){
			var _key = subset[_i];
			_temp_filter_data.push(parseFloat(d[_key]));
		};
		return null;
	});

	var _inverted_planets = planets.slice().reverse();

	_temp_filter_data.forEach(function(d,i){
		var _values = [planets[i],d]; // change here to planets[i]
		_filter_data.push(_values);
	});*/

	var _headers = new Array();
	_headers.push("Planet","Expenditure per Student Primary <br/>(% of GDP per Capita)","Adult Literacy (% of total <br/>population, 15 and above)");
	

	var _subset = new Array;

	data.forEach(function(d){
		if(subset.indexOf(d.Ctr)!=-1){
			_subset.push(d);
		};
		return null;
	});


	var _ths = _thead.selectAll("th")
		.data(_headers)
		.enter()
		.append("th")
		.style("text-align","center")
		.html(function(d,i){ 
			return d; 
		});

	if(isBlank != "blank"){
		var _trs = _tbody.selectAll("tr")
			.data(_subset)
			.enter()
			.append("tr");

		var _tds = _trs.selectAll("td")
		.data(function(d,i){ return [d.Ctr,d.Expenditure,d.Literacy]; })
		.enter()
		.append("td")
		.style("text-align","center")
		.html(function(d,i){
			if(i==0){
				var _idx = subset.indexOf(d);
				return planets[_idx];
				//return d;
			}else{
				return Math.round(d*10)/10;
			};

		});

	};

	return null;
};

