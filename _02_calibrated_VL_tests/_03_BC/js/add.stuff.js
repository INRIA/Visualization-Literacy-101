function addDISCLAIMERBUTTONS(data){

	var _agreement = d3.select("#spacer")
		.append("p")
		.style("text-align","center")
		.html("I have read the disclaimer carefully");

	var _button_container = d3.select("#button-container");

		_button_container.append("div")
		.attr("class","btn btn-success btn-large btn-proceed accept")
		.html("Accept")
		.on("mouseup",function(){
			
			d3.select("#header")
			.style("height",null)
			.select("p")
			.style("margin-top",null)
			.html(null);

			setDEMOGRAPHICSURVEY(data);
			d3.select(this).remove();
			d3.select(".decline").remove();
			_agreement.remove();
			return null;
		});

		_button_container.append("div")
		.attr("class","btn btn-danger btn-large btn-proceed decline")
		.html("Decline")
		.on("mouseup",function(){

			addQUESTION(
				"Sorry but for this study we need demographic information. "+
				"Thank you for your time."
			);

			d3.select(this).remove();
			d3.select(".accept").remove();
			_agreement.remove();
			return null;
		});

	return null;
};

function addQUESTION(title){
	var _title_container = d3.select("#header")
		.select("p")
		.html(title);

	return null;
};

function addTITLE(title){
	_svg.append("text")
	.attr("class","chart-title")
	.attr("y",-20)
	.text(title);

	return null;
};

function addBUTTONS(answers,data,dateFormat,planets,ctrRef){
	var _num_buttons = answers.length;
	var parseDate = d3.time.format(dateFormat).parse;

	var _button_container = d3.select("#button-container")
		.selectAll(".btn-ans")
		.data(answers);


	_button_container.enter()
	.append("div")
	.attr("class","btn btn-primary btn-large btn-ans")
	.html(function(d,i){
		if(parseDate(d)!=null){
			
			var decompose_date = d.split("/");
			
			if(decompose_date.length>1){
				if(parseInt(decompose_date[2])>20){
					var year="27"+decompose_date[2];
				}else{
					var year="28"+decompose_date[2];
				}
				
				var proper_date = decompose_date[0] + "/" + decompose_date[1] + "/" + year;
			}else{
				_future_date = parseInt(decompose_date[0])+800;
				var proper_date = _future_date.toString();
			}

			if(_environment.Data=="low"){
				return parseDate(proper_date).getFullYear();
			}else if(_environment.Data=="med"){
				return monthNames[parseDate(proper_date).getMonth()] + " " + parseDate(proper_date).getFullYear();			
			}else if(_environment.Data=="high"){
				return monthNames[parseDate(proper_date).getMonth()] + " " + parseDate(proper_date).getDate();
			};
		}else if(isNaN(d)==true){

			var _splitD = d.split("-");

			if(_splitD.length>1){

				var _readable_date = new Array();

				_splitD.forEach(function(c){

					var decompose_date = c.split("/");
					
					if(decompose_date.length>1){
						if(parseInt(decompose_date[2])>20){
							var year="27"+decompose_date[2];
						}else{
							var year="28"+decompose_date[2];
						}
						
						var proper_date = decompose_date[0] + "/" + decompose_date[1] + "/" + year;
					}else{
						_future_date = parseInt(decompose_date[0])+800;
						var proper_date = _future_date.toString();
					}

					if(_environment.Data=="low"){
						_readable_date.push(parseDate(proper_date).getFullYear());
					}else if(_environment.Data=="med"){
						_readable_date.push(monthNames[parseDate(proper_date).getMonth()] + " " + parseDate(proper_date).getFullYear());
					}else if(_environment.Data=="high"){
						_readable_date.push(monthNames[parseDate(proper_date).getMonth()] + " " + parseDate(proper_date).getDate());
					};
					return null;
				});

				return _readable_date[0] + " - " + _readable_date[1];
			}else if(d=="Yes"){
				return d;
			}else if(d=="No"){
				return d;
			}else{
				if(ctrRef!=null){
					var _planet_arr = new Array();
					answers.forEach(function(c){
						var idx = ctrRef.indexOf(c);
						_planet_arr.push(planets[idx])
					});
					var reverse_planets = _planet_arr;
				}else{
					var reverse_planets = planets.slice().reverse();
				}

				var _values_split = d.split("/");
				if(_values_split.length>1){
					var _output = new Array();
					_values_split.forEach(function(c){
						var _idx = ctrRef.indexOf(c);
						_output.push(planets[_idx]);
						return null;
					});
					return _output[0]+" / "+_output[1];
				}
				var _idx = ctrRef.indexOf(d);
				
				return planets[_idx];
			};
		}else{
			return d;
		}
	})
	.on("mouseup",function(d){
		if(parseDate(d)==null){
			answer = d;
		}else{
			var decompose_date = d.split("/");
			if(parseInt(decompose_date[2])>20){
				var year="19"+decompose_date[2];
			}else{
				var year="20"+decompose_date[2];
			}
			
			if(_environment.Data=="low"){
				var answer = year;
			}else{
				var answer = decompose_date[0] + "/" + decompose_date[1] + "/" + year;
			}
		};

		window.clearInterval(_setTime);

		checkANSWER(d)
		_trial += 1;
		_global_iterator += 1;
		setCOMPLEXITYBLOCK(data);
		return null;
	});

	return null;
};


function addSUBMITDEMOGRAPHICSURVEY(data){
	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Submit Information")
		.on("mouseup",function(){
			var _check_fill_in = checkDEMOGRAPHICSURVEY();
			if(_check_fill_in == true){

				d3.select(this).remove();
				d3.select(".s-container").remove();

				d3.select("#header")
				.style("height","585px")
				.select("p")
				.style("margin-top","200px");

				setTimeout(function(){
					startSCENARIO(data);
				},500);
			};
			return null;
		});

	return null;
};


function addBEGINSTUDYBUTTON(data){
	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Begin the search")
		.on("mouseup",function(){

			var _stage = d3.select("#chart-container");
			_stage.style("background-color",null)
			.style("border-color",null);
			_stage.selectAll("div").remove();

			d3.select("body")
			.style("background-color",null);

			setCOMPLEXITYBLOCK(data,true);
			d3.select(this).remove();
			return null;
		});

	return null;
};

function addFINISHSTUDYBUTTON(){
	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Go back home")
		.on("mouseup",function(){
			window.location = "http://peopleviz.gforge.inria.fr/trunk/vLiteracy/home/";
		});

	return null;
};


function addPROCEEDBUTTON(data){

	var _agreement = d3.select("#spacer")
		.append("p")
		.style("text-align","center")
		.html("I have read the question carefully");

	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Proceed to graph framework")
		.on("mouseup",function(){
			setCOMPLEXITYBLOCK(data);
			d3.select(this).remove();
			_agreement.remove();
			return null;
		});

	return null;
};


function addDRAWBUTTON(data){

	var _agreement = d3.select("#spacer")
		.append("p")
		.style("text-align","center")
		.html(function(){
			if(_trial==0){
				return "I have familiarized myself with the table headers"
			}else{
				return "I have familiarized myself with the graph framework"
			};
		});

	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Display data")
		.on("mouseup",function(){

			removeSVG();
			drawENVIRONMENT(data);
			d3.select(this).remove();
			_agreement.remove();
			return null;
		});

	return null;
};

function addSUBMITCONFIDENCESURVEY(data){
	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Submit Information")
		.on("mouseup",function(){
			var _check_fill_in = checkCONFIDENCESURVEY();
			
			if(_check_fill_in == true){

				d3.select(this).remove();
				d3.select(".s-container").remove();

				_trial += 1;
				setCOMPLEXITYBLOCK(data);
			};

			return null;
		});

	return null;
};


function submitGRAPHICACYSURVEYandFINISH(){
	var _button_container = d3.select("#button-container")
		.append("div")
		.attr("class","btn btn-primary btn-large btn-proceed")
		.html("Submit and finish study")
		.on("mouseup",function(){
			var _check_fill_in = checkGRAPHICACYSURVEY();
			
			if(_check_fill_in == true){

				d3.select(this).remove();
				d3.select(".s-container").remove();

				endSTUDY();
			};

			return null;
		});

	return null;
};