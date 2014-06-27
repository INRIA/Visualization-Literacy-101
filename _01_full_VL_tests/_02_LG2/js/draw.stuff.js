// ----------- FOR SVG -----------
var _svg_width = 1024,
	_svg_height = 493,
	_svg_padding = [62,50,75,100];

var _svg; // DEFINE SVG GLOBALY

// ----------- FOR BAR CHART -----------
var _y_scale = d3.scale.linear()
	.range([0,_svg_height-_svg_padding[1]-_svg_padding[2]]).nice();

// ----------- FOR LINE CHART -----------
var _inverted_y_scale = d3.scale.linear()
	.range([_svg_height-_svg_padding[1]-_svg_padding[2],0]).nice();

var _x_time_scale = d3.time.scale()
	.range([0,_svg_width-(_svg_padding[0]+_svg_padding[3])]);

var _line = d3.svg.line()
    .x(function(d) { return _x_time_scale(d.date); })
    .y(function(d) { return _inverted_y_scale(d.expectancy); });

var _inverted_line = d3.svg.line()
    .x(function(d) { return _x_time_scale(d.date); })
    .y(function(d) { return _y_scale(d.expectancy); });

// ----------- FOR BROKEN LINE CHART -----------
var _low_inverted_y_scale = d3.scale.linear()
	.range([_svg_height-_svg_padding[1]-_svg_padding[2],0]);

var _high_inverted_y_scale = d3.scale.linear()
	.range([_svg_height-_svg_padding[1]-_svg_padding[2],0]);

var _clamp1_x_time_scale = d3.time.scale()
	.range([0,((_svg_width-(_svg_padding[0]+_svg_padding[3]))/2)-20]);

var _clamp2_x_time_scale = d3.time.scale()
	.range([((_svg_width-(_svg_padding[0]+_svg_padding[3]))/2)+20,_svg_width-(_svg_padding[0]+_svg_padding[3])]);

var _clamp1_line = d3.svg.line()
    .x(function(d) { return _clamp1_x_time_scale(d.date); })
    .y(function(d) { return _low_inverted_y_scale(d.expectancy); });

var _clamp2_line = d3.svg.line()
    .x(function(d) { return _clamp2_x_time_scale(d.date); })
    .y(function(d) { return _high_inverted_y_scale(d.expectancy); });

var _inverted_clamp2_line = d3.svg.line()
    .x(function(d) { return _clamp2_x_time_scale(d.date); })
    .y(function(d) { return _y_scale(d.expectancy); });

// ----------- FOR BIFOCAL LINE CHART -----------
var _low_inverted_biy_scale = d3.scale.linear()
	.range([_svg_height-_svg_padding[1]-_svg_padding[2],(_svg_height-_svg_padding[1]-_svg_padding[2])/2]);

var _high_inverted_biy_scale = d3.scale.linear()
	.range([(_svg_height-_svg_padding[1]-_svg_padding[2])/2,0]);

// ----------- FOR GROUPED BAR CHART -----------
var _x_scale_group_0 = d3.scale.ordinal();

var _x_scale_group_1 = d3.scale.ordinal();

// ----------- FOR AXES -----------
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
	.attr("class","no-selection")
	.attr("height",_svg_height)
	.attr("width",_svg_width)
	.append("g")
	.attr("transform","translate("+[_svg_padding[0],_svg_padding[1]]+")");

	return null;
};


function drawLINECHART(data,subset,dateformat,yaxis,isBlank,planets){
	var _line_colors = d3.scale.category10(),
		parseDate = d3.time.format(dateformat).parse;

	var _filter_data = new Array();
	data.forEach(function(d){	
		var _values = new Object;
		_values.date = d.date;
		for(var _i=0; _i<subset.length; _i++){
			var _key = subset[_i];
			_values[_key] = d[_key];
		};
		_filter_data.push(_values);
		return null;
	});

	_line_colors.domain(d3.keys(_filter_data[0]).filter(function(key){ return key !== "date"; }))

	_filter_data.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	var _countries = _line_colors.domain().map(function(name){
		return{
			name: name,
			values: _filter_data.map(function(d){
				return {date: d.date, expectancy: +d[name]};
			})
		};
	});

	_x_time_scale.domain(d3.extent(_filter_data, function(d){ return d.date; }))
	if(d3.min(_countries, function(c){ return d3.min(c.values, function(v){ return v.expectancy; }); })>=0){
		_inverted_y_scale.domain([0,d3.max(_countries, function(c){ return d3.max(c.values, function(v){ return v.expectancy; }); })]);
	}else{
		_inverted_y_scale.domain([d3.min(_countries, function(c){ return d3.min(c.values, function(v){ return v.expectancy; }); }),d3.max(_countries, function(c){ return d3.max(c.values, function(v){ return v.expectancy; }); })]);
	};

	_x_axis.scale(_x_time_scale)

	_y_axis.scale(_inverted_y_scale);

	// ADD AXES
	_svg.append("g")
	.attr("class","axis y-axis")
	.call(_y_axis)
    .append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text(yaxis);

	_svg.append("g")
	.attr("class","axis x-axis")
	.attr("transform","translate("+[0,_inverted_y_scale(0)]+")")
	.call(_x_axis)
	.selectAll("text")
	.attr("y", 0)
	.attr("x", 9)
	.attr("dy", ".35em")
	.attr("transform", "rotate(45)")
	.style("text-anchor", "start");


	// EXPAND TICKS TO GRID
	d3.select(".y-axis")
	.selectAll(".tick")
	.select("line")
	.attr("x1",-6)
	.attr("x2",_svg_width-(_svg_padding[0]+_svg_padding[3]))
	.style("stroke","#DDD");

	d3.select(".x-axis")
	.selectAll(".tick")
	.select("line")
	.attr("y1",function(){
		var _offset = d3.transform(d3.select(".x-axis").attr("transform")).translate[1];
		_offset = _svg_height-_svg_padding[1]-_svg_padding[2]-_offset;
		return _offset+6;
	})
	.attr("y2",function(){
		var _offset = d3.transform(d3.select(".x-axis").attr("transform")).translate[1];
		_offset = _svg_height-_svg_padding[1]-_svg_padding[2]-_offset;
		return -(_svg_height-_svg_padding[1]-_svg_padding[2])+_offset;
	})
	.style("stroke","#DDD");

	var _legend = _svg
		.append("g")
		.attr("class","legend-group")
		.selectAll(".legend")
		.data(_countries.slice().reverse())
		.enter()
		.append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i){ return "translate(0," + i * 20 + ")"; });

	_legend.append("circle")
	.attr("cx", _svg_width-(_svg_padding[0]+_svg_padding[3])+12.5)
	.attr("cy",7.5)
	.attr("r",5)
	.style("fill", function(d){ return _line_colors(d.name) });

	_legend.append("text")
	.attr("x", _svg_width-(_svg_padding[0]+_svg_padding[3])+25)
	.attr("y", 9)
	.attr("dy", ".35em")
	.text(function(d,i){ 
		return planets[i];
	});

	if(isBlank != "blank"){
		var _line_chart = _svg.append("g")
			.attr("class","line-chart")
			.selectAll(".line")
			.data(_countries);

		var _lines = _line_chart.enter()
			.append("g")
			.attr("class","line");

		_lines.append("path")
		.attr("class","line-path")
		.attr("d",function(d){ return _line(d.values); })
		.style("stroke",function(d){ return _line_colors(d.name); });

	};


	return null;
};

function drawTABLE(data,subset,lgth,title,isBlank,dateFormat,planets){
	var _numCols = subset.length+1;
	var parseDate = d3.time.format(dateFormat).parse;

	var _title = d3.select("#chart-container")
		.append("div")
		.attr("class","table-title full-width")
		.html("<i>Table:</i> "+title);

	var _table = d3.select("#chart-container")
		.append("table")
		.attr("class","table table-bordered table-striped table-condensed no-selection")
		.style("width",_numCols*100+"px")

	var _thead = _table.append("thead");
	var _tbody = _table.append("tbody");

	var _filter_data = new Array();

	var _subset = data.slice(-lgth);

	_subset.forEach(function(d){
		var _values = new Array();
		_values.push(d.date);
		for(var _i=0; _i<subset.length; _i++){
			var _key = subset[_i];
			_values.push(d[_key]);
		};
		_filter_data.push(_values);
		return null;
	});

	var _headers = new Array();
	_headers.push("Date");
	
	var _inverted_planets = planets.slice().reverse();

	subset.forEach(function(d,i){
		_headers.push(_inverted_planets[i]);
		return null;
	});

	var _ths = _thead.selectAll("th")
		.data(_headers)
		.enter()
		.append("th")
		.html(function(d,i){ 
			return d; 
		});

	if(isBlank != "blank"){
		var _trs = _tbody.selectAll("tr")
			.data(_filter_data)
			.enter()
			.append("tr");

		var _tds = _trs.selectAll("td")
		.data(function(d){ return d; })
		.enter()
		.append("td")
		.html(function(d,i){

			if(_environment.Data!="high"){
				var _parseD = d.split("/");
			}else{
				var _parseD = d.split("-");
			};

			if(_parseD.length>1 && _parseD[0]!= ""){
				if(_environment.Data=="low"){
					return parseDate(d).getFullYear();
				}else if(_environment.Data=="med"){
					return monthNames[parseDate(d).getMonth()] + " " + parseDate(d).getFullYear();			
				}else if(_environment.Data=="high"){
					return monthNames[parseDate(d).getMonth()] + " " + parseDate(d).getDate() + ", " + parseDate(d).getFullYear();
				};
			}else{
				return Math.round(d*10)/10;
			};
		});
	};

	return null;
};