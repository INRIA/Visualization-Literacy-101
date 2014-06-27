// GLOBAL VARS
var _block = 0,
	_environment,
	_trial = 1000000,
	_repetition = 0,
	_global_iterator = 1,
	_timer = 11000,
	_setTime;

var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function disclaimer(data){

	d3.select("#header")
	.style("height","585px")
	.select("p")
	.style("margin-top","200px");	

	addQUESTION(
		"Hello and thank you for taking part in this study. "+
		"Before you start, you will be asked to fill out a short demographic survey. "+
		"The information you will provide will remain anonymous, "+
		"will be used solely for the present study, and will not be distributed "+
		"to any third-party."
	);

	addDISCLAIMERBUTTONS(data);

	return null;
};

function startSCENARIO(data){
	d3.select("body")
	.style("background-color","#111");

	var _stage = d3.select("#chart-container");

	_stage.style("background-color","#000")
	.style("border-color","#121212");

	_stage.append("div")
	.attr("class","movie-container")
	.append("img")
	.attr("src","../_00_static/img/universe.gif")
	.style("height","500px");

	_stage.append("div")
	.attr("class","story-container")
	.html("<p class='underline'><i>Please consider the following scenario carefully.</i></p>"+
		"<p>The year is 2813. The earth is a desolate place. "+
		"Most of mankind has migrated throughout the universe. "+
		"The last handfull of humans remaining on earth are now actively seeking "+
		"another planet to settle on. "+
		"Please help these people determine what the most hospitable planet is "+
		"by answering the following series of questions as quickly and accurately as possible.</p>");

	setTimeout(function(){
		d3.select("#header")
		.style("height",null)
		.select("p")
		.style("margin-top",null);

		addBEGINSTUDYBUTTON(data);
	},1500);


	return null;
};


function setCOMPLEXITYBLOCK(data,start){
	removeSVG();
	window.scrollTo(0,0);

	d3.select("#footer")
	.select(".trialID")
	.html("[" + _global_iterator + "/" + (_exp_lgth-1) + "]");

	if(_trial<data[_block].values.length){
		_environment = data[_block].values[_trial];
		setTRIAL(data);
		
		// RESET TIMER
		d3.select(".timer")
		.html("<span style='font-size:18px;'>Timer:</span> " + _timer/1000 + "<span style='font-size:18px;'> seconds</span>");

	}else if(_trial==data[_block].values.length){
		setCONFIDENCESURVEY(data);
	}else{
		_trial = 0;

		if(start==null || start==undefined){
			_block += 1;
		};

		// THIS IS WHER IT BOUNCES WHEN THERE ARE NO MORE TRIALS
		if(data[_block] != undefined){
			_environment = data[_block].values[_trial];
			var _chart_img="scatterplot";

			
			if(_environment.Samples=="1"){
				if(_environment.Task=="intersection" || _environment.Task=="average" && _environment.Question=="extrapolation"){
					addQUESTION(
						"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
						"<i>Question:</i> " + getQUESTION(_environment) + "</br></br>"+
						"<i>Note 1: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
						"start as soon as you click on the “Display data” button (on the next screen).</br></br>"+
						// CHANGE TO NOTE 2
						"<i>Note 2: </i>The values and planet names overlined in the question will change "+
						"for each repetition in this part of the study. Please make sure you read the "+
						"question carefully and familiarize yourself with the table headers or the graph "+
						"framework before clicking the “Display data” button each time."
					);
				}else{
					addQUESTION(
						"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
						"<i>Question:</i> " + getQUESTION(_environment)+"</br></br>"+
						"<i>Note: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
						"start as soon as you click on the “Display data” button (on the next screen)."
					);
				};
			}else if(_environment.Samples=="4" || _environment.Samples=="8"){
				if(_environment.Task=="intersection" || _environment.Distractor=="1"){
					addQUESTION(
						"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
						"<i>Question:</i> " + getQUESTION(_environment) + "</br></br>"+
						"<i>Note 1: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
						"start as soon as you click on the “Display data” button (on the next screen).</br></br>"+
						// NOTE 2
						"<i>Note 2: </i>The values and planet names overlined in the question will change "+
						"for each repetition in this part of the study. Please make sure you read the "+
						"question carefully and familiarize yourself with the table headers or the graph "+
						"framework before clicking the “Display data” button each time."
					);
				}else{
					addQUESTION(
						"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
						"<i>Question:</i> " + getQUESTION(_environment)+"</br></br>"+
						"<i>Note: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
						"start as soon as you click on the “Display data” button (on the next screen).</br></br>"
					);					
				};
			}else{
				addQUESTION(
					"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
					"<i>Question:</i> " + getQUESTION(_environment)+"</br></br>"+
					"<i>Note: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
					"start as soon as you click on the “Display data” button (on the next screen).</br></br>"
				);
			}

			d3.select("#header")
			.style("height","585px")
			.select("p")
			.style("margin-top","200px");

			setTimeout(function(){
				addPROCEEDBUTTON(data);
			},500);

			console.log("item ID: " + _environment.Block);

		}else{

			d3.select("#header")
			.html(null);

			d3.select("#header")
			.style("height","585px")
			.select("p")
			.style("margin-top","200px");

			setTimeout(function(){
				d3.select("#header")
				.style("height",null)
				.select("p")
				.style("margin-top",null);
				endSTUDY();
			},1500);
		};

		// RESET TIMER
		d3.select(".timer")
		.html("<span style='font-size:18px;'>Timer:</span> " + _timer/1000 + "<span style='font-size:18px;'> seconds</span>")

	};


	return null;
};

function setTRIAL(data){
	removeSVG();
	window.scrollTo(0,0);

	addQUESTION("<i>Question:</i> " + getQUESTION(_environment));

	// RE_SET HIGHT OF CHART CONTAINER
	d3.select("#header")
	.style("height",null)
	.select("p")
	.style("margin-top",null);

	drawBLANKENVIRONMENT();
	addDRAWBUTTON(data);

	console.log("repetition ID: " + _environment.Trial);

	return null;
};

function drawBLANKENVIRONMENT(){
	var _ctr_idx = _repetition;

	if(_environment.Data=="low"){
		var _set=_literacy_data,
			_date_format="%Y",
			_x_axis="Expenditure per Student, Primary (% of GDP per Capita)",
			_y_axis="Adult Literacy (% of total population, 15 and above)",
			_title="Percentage of Adult Literacy by Expenditure per Student in Primary School";
	}else if(_environment.Data=="med"){
		var _set=_literacy_data,
			_date_format="%m-%Y",
			_x_axis="Expenditure per Student, Primary (% of GDP per Capita)",
			_y_axis="Adult Literacy (% of total population, 15 and above)",
			_title="Percentage of Adult Literacy by Expenditure per Student in Primary School";
	}else if(_environment.Data=="high"){
		var _set=_literacy_data,
			_date_format="%m-%d-%Y",
			_x_axis="Expenditure per Student, Primary (% of GDP per Capita)",
			_y_axis="Adult Literacy (% of total population, 15 and above)",
			_title="Percentage of Adult Literacy by Expenditure per Student in Primary School";
	};

	var _countries = _environment.Ctrs.split(";");

	if(_trial == 0){ // DRAW TABLE
		var _planets = _environment.Planets.split(";")

		if(_environment.Samples==1){
			var _full_title = _title+" on "+_environment.Samples+" Planet";
		}else{
			var _full_title = _title+" on "+_environment.Samples+" Planets";
		};

		drawTABLE(_set,_countries,_set.length,_full_title,"blank",_date_format,_planets);

	}else{ // DRAW CHART
		drawSVG();
		var _planets = _environment.Planets.split(";")
		if(_environment.Samples==1){
			addTITLE(_title+" on "+_environment.Samples+" Planet");
		}else{
			addTITLE(_title+" on "+_environment.Samples+" Planets");
		};
		if(_environment.Layout=="single"){
			drawSCATTERPLOT(_set,_countries,"blank",_planets,null,_x_axis,_y_axis);
		}

	};

	return null;
};

function drawENVIRONMENT(data){
	var _ctr_idx = _repetition;

	if(_environment.Data=="low"){
		var _set=_literacy_data,
			_date_format="%Y",
			_x_axis="Expenditure per Student, Primary (% of GDP per Capita)",
			_y_axis="Adult Literacy (% of total population, 15 and above)",
			_title="Percentage of Adult Literacy by Expenditure per Student in Primary School",
			_button_date_format="%Y";
	}else if(_environment.Data=="med"){
		var _set=_literacy_data,
			_date_format="%m/%Y",
			_x_axis="Expenditure per Student, Primary (% of GDP per Capita)",
			_y_axis="Adult Literacy (% of total population, 15 and above)",
			_title="Percentage of Adult Literacy by Expenditure per Student in Primary School",
			_button_date_format="%m/%d/%Y";
	}else if(_environment.Data=="high"){
		var _set=_literacy_data,
			_date_format="%m-%d-%Y",
			_x_axis="Expenditure per Student, Primary (% of GDP per Capita)",
			_y_axis="Adult Literacy (% of total population, 15 and above)",
			_title="Percentage of Adult Literacy by Expenditure per Student in Primary School",
			_button_date_format="%m/%d/%Y";
	};

	var _countries = _environment.Ctrs.split(";");

	if(_trial == 0){ // DRAW TABLE
		var _planets = _environment.Planets.split(";")

		if(_environment.Samples==1){
			var _full_title = _title+" on "+_environment.Samples+" Planet";
		}else{
			var _full_title = _title+" on "+_environment.Samples+" Planets";
		};

		var _choices = _environment.ChoicesTable.split(";")
		var _planets = _environment.Planets.split(";")
		drawTABLE(_set,_countries,_set.length,_full_title,null,_date_format,_planets,_choices);
		addBUTTONS(_choices,data,_button_date_format,_planets,_countries);// NEED REAL ANSWERS

	}else{ // DRAW CHART
		drawSVG();
		if(_environment.Samples==1){
			addTITLE(_title+" on "+_environment.Samples+" Planet");
		}else{
			addTITLE(_title+" on "+_environment.Samples+" Planets");
		};
		var _choices = _environment.Choices.split(";");
		var _planets = _environment.Planets.split(";")
		addBUTTONS(_choices,data,_button_date_format,_planets,_countries);// NEED REAL ANSWERS


		if(_environment.Layout=="single"){
			drawSCATTERPLOT(_set,_countries,null,_planets,_choices,_x_axis,_y_axis)
		}

	};

	var t = 0;

	_setTime = window.setInterval(function(){
		if(t<_timer){
			t+=1000;
			var timeout = _timer-t;
			d3.select(".timer")
			.html("<span style='font-size:18px;'>Timer:</span> " + timeout/1000 + "<span style='font-size:18px;'> seconds</span>")
		}else{
			window.clearInterval(_setTime);			
			checkANSWER("Time out")
			_trial += 1;
			_global_iterator += 1;
			setCOMPLEXITYBLOCK(data);
			alert("Sorry, time’s up!");
			return null;
		}
	},1000)

	return null;
};


function getQUESTION(environment){
	var _data = environment.Data,
		_task = environment.Task,
		_question = environment.Question,
		_distractor = environment.Distractor,
		_samples = environment.Samples,
		_ctrs = environment.Ctrs.split(";");
		_all_planets = environment.Planets.split(";");

	if(_trial==0){
		var _track = environment.TrackTable,
			_value = parseFloat(environment.ValsTable).toFixed(1);
	}else{
		var _track = environment.Track,
			_value = parseFloat(environment.Vals).toFixed(1);
	};

	var _planet_idx = _ctrs.indexOf(_track),
		_planet = _all_planets[_planet_idx];



	if(_samples=="10" || _samples=="20" || _samples=="4" || _samples=="8"){

		if(_data=="med"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "On which planet does high expenditure per primary student lead to the highest adult literacy?";
					}else if(_distractor=="1"){
						return "Which planet spends the most on its primary students?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Where has the worst place to be looking for a job been?";
					}else if(_distractor=="1"){
						return "Which planet spends the most on its primary students?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "On which planet does low expenditure per primary student have the worst impact on adult literacy?";
					}else if(_distractor=="1"){
						return "Which planet has the lowest adult literacy?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Where has the best place to be looking for a job been?";
					}else if(_distractor=="1"){
						return "When was the best time to be looking for a job on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Does expenditure per primary student generally have a positive impact on adult literacy in this group of planets?";
					}else if(_distractor=="1"){
						return "Does expenditure per primary student seem to have a positive impact on adult literacy on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "If unemployment keeps following its general trend on each of these planets, would you say that future generations of students will have an easier time finding a job wherever they look?";
					}else if(_distractor=="1"){
						return "If unemployment keeps following the same general trend on planet <b class='overline'>" + _planet + "</b>, would you say that future generations of students on that planet will have an easier time finding a job when they enter the job market?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Which planet spends less than <b class='overline'>" + _value + "%</b> of its GDP on primary students, yet has a highly literate adult population?"
					}else if(_distractor=="1"){
						return "Which planet spends approximately <b class='overline'>" + Math.round(_value) + "%</b> of its GDP on primary students?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that an inter-planetary treaty aiming to bring unemployment rates down to <b class='overline'>" + _value + "</b>  was signed by each of these planets at the beginning of this time period, which planet was the first to achieve the common goal?";
					}else if(_distractor=="1"){
						return "Knowing that the local government on planet <b class='overline'>" + _planet + "</b> set up a plan to bring unemployment down to <b class='overline'>" + _value + "</b>, when do you think this plan first took effect?";
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What is the approximate average adult literacy in this group of planets?";
					}else if(_distractor=="1"){
						return "What is the average adult literacy on the <b class='overline'>" + Math.round(_value) + "</b> planets that spend the most on primary students?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Among these planets, which has generally been the worst place to be looking for a job since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "Looking at the average unemployment rate of all of these planets, would you say that planet <b class='overline'>" + _planet + "</b> has a particular problem with unemployment?";
					};

				};

			}else if(_task=="trendComp"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "On how many planets does high expenditure per primary student seem to have a high positive impact on adult literacy?";
					}else if(_distractor=="1"){
						return "How many planets spend approximately the same amount on primary students as planet <b class='overline'>" + _planet + "</b> but have a higher percentage of literate adults?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Which local government failed the most badly at containing unemployment since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "Knowing that a major economic crisis occurred during this time period, when do you think the biggest redundancy plan took effect on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			};

		};
	};
	return null;
};

function endSTUDY(){
	d3.select("#footer")
	.html(null);

	d3.select("#header")
	.style("height","585px")
	.select("p")
	.style("margin-top","200px");

	var _stage = d3.select("#chart-container");
	_stage.style("background-color","#000")
	.style("border-color","#121212");

	setTimeout(function(){
		window.open("../_00_static/end.php","_blank");
	},2000);

	return null;
};

function startENDSCENARIO(uuid){
	d3.select("body")
	.style("background-color","#111");

	var _stage = d3.select("#chart-container");

	_stage.style("background-color","#000")
	.style("border-color","#121212");

	_stage.append("div")
	.attr("class","movie-container")
	.append("img")
	.attr("src","../_00_static/img/blast_off.gif")
	.style("height","500px");

	_stage.append("div")
	.attr("class","story-container")
	.html("Great! Thanks for helping humanity find a new home!</p>");

	setTimeout(function(){
		d3.select("#header")
		.style("height",null)
		.select("p")
		.style("margin-top",null);
	},1500);

	return null;
};
