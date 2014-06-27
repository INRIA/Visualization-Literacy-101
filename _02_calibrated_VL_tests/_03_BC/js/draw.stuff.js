// ----------- FOR SVG -----------
var _svg_width = 1024,
	_svg_height = 500,
	_svg_padding = [62,50,75,100];

var _svg; // DEFINE SVG GLOBALY

// ----------- FOR BAR CHART -----------
var _y_scale = d3.scale.linear()
	.range([0,_svg_height-_svg_padding[1]-_svg_padding[2]]).nice();

// ----------- FOR AXES -----------
var _y_axis_scale = d3.scale.linear()
	.range([0,_svg_height-_svg_padding[1]-_svg_padding[2]]);

var _y_axis = d3.svg.axis()
	.orient("left");

var _x_axis = d3.svg.axis()
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

function drawBARCHART(data,subset,isBlank,planets,answers){
	var _subset = data.slice(-1);

	var _filter_data = new Array();
	_subset.forEach(function(d){	
		var _global_vals = new Object;
		//_values.date = d.date;
		for(var _i=0; _i<subset.length; _i++){
			var _values = new Object;
			var _key = subset[_i];
			//_values[_key] = d[_key];
			_values.ctr = _key;
			_values.val = d[_key];
			//_filter_data.push(parseFloat(d[_key]));
			_filter_data[_i] = _values;
		};
		//_filter_data.push(_global_vals);
		return null;
	});

	var _num = 20,
		//_num = _filter_data.length,
		_chart_width = _svg_width-(_svg_padding[0]+_svg_padding[3]),
		_chart_height = _svg_height-_svg_padding[1]-_svg_padding[2];
		_bar_width = (_chart_width/_num)-2;

	_y_scale.domain([0,d3.max(_filter_data,function(d){ return d.val; })]);
	_y_axis_scale.domain([d3.max(_filter_data,function(d){ return d.val; }),0]);
	_y_axis.scale(_y_axis_scale);

	_svg
	.attr("transform","translate(" + [(_svg_width-(_bar_width+2)*_filter_data.length)/2,_svg_padding[1]] + ")");

	// ----------- AXES -----------
	_svg.append("g")
	.attr("class","axis y-axis")
	.call(_y_axis);

	// EXPAND TICKS TO GRID
	d3.select(".y-axis")
	.selectAll(".tick")
	.select("line")
	.attr("x1",-6)
	.attr("x2",(_bar_width+2)*_filter_data.length)
	.style("stroke","#DDD");

	var _bar_chart_x_axis = _svg.append("g")
	.attr("class","axis x-axis");

	_bar_chart_x_axis.append("line")
	.attr("x1",0)
	.attr("y1",_svg_height-_svg_padding[1]-_svg_padding[2])
	.attr("x2",(_bar_width+2)*_filter_data.length)
	.attr("y2",_svg_height-_svg_padding[1]-_svg_padding[2]);

	var _x_ticks = _bar_chart_x_axis.selectAll(".tick")
	.data(subset);

	var _x_ticks_g = _x_ticks.enter()
	.append("g")
	.attr("class","tick")
	.attr("transform",function(d,i){
		return "translate(" + [((i*_bar_width)+i*2)+_bar_width/2,_svg_height-_svg_padding[1]-_svg_padding[2]] + ")"
	});

	_x_ticks_g.append("line")
	.attr("x1",0)
	.attr("y1",0)
	.attr("x2",0)
	.attr("y2",7.5);

	_x_ticks_g.append("text")
	.style("text-anchor","start")
	//.attr("y",25)
	.attr("x",9)
	.attr("dy", "1em")
	.attr("transform","rotate(45)")
	.text(function(d,i){ return planets[i]; });

	// DRAW chart-container
	if(isBlank != "blank"){	
		var _bar_chart = _svg.append("g")
			.attr("class","bar-chart")
			.selectAll(".bar")
			.data(_filter_data);

		_bar_chart.enter()
		.append("rect")
		.attr("class","bar")
		.attr("width",_bar_width)
		.attr("height",function(d){
			return _y_scale(d.val);
		})
		.attr("x",function(d,i){
			return i*_bar_width+i*2;
		})
		.attr("y",function(d){
			return _chart_height-_y_scale(d.val);
		})
		.style("fill",function(d,i){
			var _ans_split = answers[0].split("/");
			if(_ans_split.length>1){
				_all_groups = new Array;
				answers.forEach(function(c){
					var _temp = c.split("/");
					_all_groups.push(_temp[0]);
					_all_groups.push(_temp[1]);
				});
				var _new_color = ["#d62728","#d62728","#ff7f0e","#ff7f0e","#2ca02c","#2ca02c","#9467bd","#9467bd","#8c564b","#8c564b","#e377c2","#e377c2"];
				var _idx = _all_groups.indexOf(d.ctr);
				if(_idx!=-1){
					return _new_color[_idx];
				}else{
					return null;
				}
			}else{
				return null;
			}
		})
	};

	return null;
};


function drawTABLE(data,subset,lgth,title,isBlank,dateFormat,planets,answers){
	var _numCols = 2;
	var parseDate = d3.time.format(dateFormat).parse;

	var _title = d3.select("#chart-container")
		.append("div")
		.attr("class","table-title full-width")
		.html("<i>Table:</i> "+title);

	var _table = d3.select("#chart-container")
		.append("table")
		.attr("class","table table-bordered table-striped table-condensed no-selection")
		.style("width",_numCols*100+"px")
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

	_subset.forEach(function(d){
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
	});

	var _headers = new Array();
	_headers.push("Planet","Value");
	


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
			.append("tr")
			.style("background-color",function(d,i){
				var _ans_split = answers[0].split("/");
				if(_ans_split.length>1){
					d3.select(".table").classed("table-striped",false);
					_all_groups = new Array;
					answers.forEach(function(c){
						var _temp = c.split("/");
						_idx1 = subset.indexOf(_temp[0]);
						_idx2 = subset.indexOf(_temp[1]);
						_all_groups.push(planets[_idx1]);
						_all_groups.push(planets[_idx2]);
					});
					var _new_color = ["#d62728","#d62728","#ff7f0e","#ff7f0e","#2ca02c","#2ca02c","#9467bd","#9467bd","#8c564b","#8c564b","#e377c2","#e377c2"];
					var _idx = _all_groups.indexOf(d[0]);
					if(_idx!=-1){
						return _new_color[_idx];
					}else{
						return null;
					}
				}else{
					return null;
				}
			});

		var _tds = _trs.selectAll("td")
		.data(function(d){ return d; })
		.enter()
		.append("td")
		.html(function(d,i){
			
			if(i%2==0){
				return d;
			}else{
				return Math.round(d*10)/10;
			};
		});
	};

	return null;
};

