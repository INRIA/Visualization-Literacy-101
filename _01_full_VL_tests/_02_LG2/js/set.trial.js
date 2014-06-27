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
			var _chart_img="line";

			
			if(environment.Samples=="1"){
				if(_environment.Task=="intersection" || _environment.Task=="average" && _environment.Question=="extrapolation"){
					addQUESTION(
						"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
						"<i>Question:</i> " + getQUESTION(_environment) + "</br></br>"+
						"<i>Note 1: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
						"start as soon as you click on the “Display data” button (on the next screen).</br></br>"+
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
			}else if(environment.Samples=="4" || environment.Samples=="8"){
				if(_environment.Task=="intersection" || _environment.Distractor=="1"){
					addQUESTION(
						"<i>Chart type:</i> "+_chart_img+" — <img src='../_00_static/img/"+_chart_img+".png'></br>"+
						"<i>Question:</i> " + getQUESTION(_environment) + "</br></br>"+
						"<i>Note 1: </i>You will have 11 seconds to answer each question. The timer at the bottom of the page will "+
						"start as soon as you click on the “Display data” button (on the next screen).</br></br>"+
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
		var _set=_life_expectancy,
			_date_format="%Y",
			_x_axis="Date",
			_y_axis="Life expectancy (years)",
			_title="Evolution of Life Expectancy";
	}else if(_environment.Data=="med"){
		var _set=_unemployment_data,
			_date_format="%m-%Y",
			_x_axis="Date",
			_y_axis="Unemployment (rate)",
			_title="Evolution of Unemployment Rate";
	}else if(_environment.Data=="high"){
		var _set=_temperature_data,
			_date_format="%m-%d-%Y",
			_x_axis="Date",
			_y_axis="Temperature (°F)"
			_title="Evolution of Temperature";
	};

	var _countries = _environment.Ctrs.split(";");

	if(_trial == 0){ // DRAW TABLE
		var _planets = _environment.Planets.split(";")

		if(environment.Samples==1){
			var _full_title = _title+" on "+environment.Samples+" Planet";
		}else{
			var _full_title = _title+" on "+environment.Samples+" Planets";
		};

		if(_environment.Data=="low"){
			_set=_life_expectancy_table;
		}else if(_environment.Data=="med"){
			_set=_unemployment_data_table;
		}else if(_environment.Data=="high"){
			_set=_temperature_data_table;
		};

		drawTABLE(_set,_countries,_set.length,_full_title,"blank",_date_format,_planets);

	}else{ // DRAW CHART
		drawSVG();
		var _planets = _environment.Planets.split(";")
		if(environment.Samples==1){
			addTITLE(_title+" on "+environment.Samples+" Planet");
		}else{
			addTITLE(_title+" on "+environment.Samples+" Planets");
		};
		if(_environment.Layout=="single"){
			drawLINECHART(_set,_countries,_date_format,_y_axis,"blank",_planets);	
		};

	};

	return null;
};

function drawENVIRONMENT(data){
	var _ctr_idx = _repetition;

	if(_environment.Data=="low"){
		var _set=_life_expectancy,
			_date_format="%Y",
			_x_axis="Date",
			_y_axis="Life expectancy (years)",
			_title="Evolution of Life Expectancy",
			_button_date_format="%Y";
	}else if(_environment.Data=="med"){
		var _set=_unemployment_data,
			_date_format="%m/%Y",
			_x_axis="Date",
			_y_axis="Unemployment (rate)",
			_title="Evolution of Unemployment Rate",
			_button_date_format="%m/%d/%Y";
	}else if(_environment.Data=="high"){
		var _set=_temperature_data,
			_date_format="%m-%d-%Y",
			_x_axis="Date",
			_y_axis="Temperature (°F)"
			_title="Evolution of Temperature",
			_button_date_format="%m/%d/%Y";
	};

	var _countries = _environment.Ctrs.split(";");

	if(_trial == 0){ // DRAW TABLE
		var _planets = _environment.Planets.split(";")

		if(environment.Samples==1){
			var _full_title = _title+" on "+environment.Samples+" Planet";
		}else{
			var _full_title = _title+" on "+environment.Samples+" Planets";
		};

		if(_environment.Data=="low"){
			_set=_life_expectancy_table;
		}else if(_environment.Data=="med"){
			_set=_unemployment_data_table;
		}else if(_environment.Data=="high"){
			_set=_temperature_data_table;
		};

		drawTABLE(_set,_countries,_set.length,_full_title,null,_date_format,_planets);
		var _choices = _environment.ChoicesTable.split(";")
		var _planets = _environment.Planets.split(";")
		addBUTTONS(_choices,data,_button_date_format,_planets);// NEED REAL ANSWERS

	}else{ // DRAW CHART
		drawSVG();
		if(environment.Samples==1){
			addTITLE(_title+" on "+environment.Samples+" Planet");
		}else{
			addTITLE(_title+" on "+environment.Samples+" Planets");
		};
		var _choices = _environment.Choices.split(";");
		var _planets = _environment.Planets.split(";")
		addBUTTONS(_choices,data,_button_date_format,_planets);// NEED REAL ANSWERS


		if(_environment.Layout=="single"){
			drawLINECHART(_set,_countries,_date_format,_y_axis,null,_planets);
		};
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
			alert("Sorry, time’s up!")
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
		_all_planets = environment.Planets.split(";").reverse();

	if(_trial==0){
		var _track = environment.TrackTable,
			_value = parseFloat(environment.ValsTable).toFixed(1);
	}else{
		var _track = environment.Track,
			_value = parseFloat(environment.Vals).toFixed(1);
	};

	var _planet_idx = _ctrs.indexOf(_track),
		_planet = _all_planets[_planet_idx];

	if(_samples=="1"){

		if(_data=="low"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When was life expectancy the highest on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "When was the the most promising time to be born on this planet?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When was life expectancy the lowest on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "When was the worst time to be born on this planet?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Has life expectancy generally increased on this planet since the beginning of this time period?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "If life expectancy keeps following the same general trend on this planet, would you say that future generations can expect to live longer than their parents?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When did life expectancy first go above <b class='overline'>" + _value + "</b> on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that the average life expectancy on industrialized planets in this galaxy is <b class='overline'>" + _value + "</b>, when would you say the impact of industrialization first affected life expectancy on this planet?"
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What has the average life expectancy been on this planet since the beginning of this time period?"
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that since the beginning of this time period the average life expectancy on similar planets has been <b class='overline'>" + _value + "</b>, would you say that people can hope to live longer on this planet?"
					};

				};

			}else if(_task=="trendComp"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When did the highest increase in life expectancy occur on this planet since the beginning of this time period?"
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that since the beginning of this time period there has been a series of important medical advances, when do you think the most important advance took effect on this planet?"
					};

				};

			};

		}else if(_data=="med"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When was unemployment at its highest peak on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "When was the worst time to be looking for a job on this planet?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When was unemployment at its lowest peak on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "When was the best time to be looking for a job on this planet?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Has the unemployment trend generally increased on this planet since the beginning of this time period?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "If unemployment keeps following the same general trend on this planet, would you say that future generations of students will have an easier time finding a job when they enter the job market?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When did unemployment first go above <b class='overline'>" + _value + "</b> on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that the local government on this planet set up a plan to bring unemployment down to <b class='overline'>" + _value + "</b>, when do you think this plan first took effect?"
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What has the average unemployment rate been on this planet since the beginning of this time period?"
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that since the beginning of this time period the average unemployment rate on planets with similar economies has been <b class='overline'>" + _value + "</b>, would you say that this planet has a particular problem with unemployment?"
					};

				};

			}else if(_task=="trendComp"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When did the highest increase in unemployment occur on this planet since the beginning of this time period?"
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that a major economic crisis occurred during this time period, when do you think the biggest redundancy plan took effect on this planet?"
					};

				};

			};
		
		}else if(_data=="high"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When was it the hottest on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "When would people have most needed an air conditioning system on this planet?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When was it the coldest on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "When would people have most needed a heater on this planet?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Did the temperature generally rise around the middle of the year on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Is summer in the middle of the year on this planet?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When did the temperature first rise above <b class='overline'>" + _value + "</b>° this year on this planet?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that local residents consider it to be hot when the temperature exceeds <b class='overline'>" + _value + "</b>°, what was the first hot day of the year on this planet?";
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What has the average temperature been on this planet since the beginning of the year?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that for the same year, the average temperature on other planets was <b class='overline'>" + _value + "</b>°, would you say that it was particularly hot on this planet?";
					};

				};

			}else if(_task=="trendComp"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "When did the biggest increase in temperature occur on this planet since the beginning of the year?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that when the temperature rises air conditioner sales increase, when would you say that air conditioning businesses had their biggest growth in sales on this planet?";
					};

				};

			};

		};

	}else if(_samples=="4" || _samples=="8"){

		if(_data=="low"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did life expectancy reach its highest peak since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "When was life expectancy the highest on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Where has the most promising place to be born been?";
					}else if(_distractor=="1"){
						return "When was the most promising time to be born on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did life expectancy reach its lowest peak since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "When was life expectancy the lowest on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Where has the worst place to be born been?";
					}else if(_distractor=="1"){
						return "When was the worst time to be born on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Overall, has life expectancy increased on all of these planets since the beginning of this time period?";
						//"Overall, has life expectancy evolved in the same way on all of these planets?"
					}else if(_distractor=="1"){
						return "Has life expectancy generally increased on planet <b class='overline'>" + _planet + "</b> since the beginning of this time period?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "If life expectancy keeps following its general trend on each of these planets, would you say that future generations can expect to live longer than their parents wherever they are born?";
					}else if(_distractor=="1"){
						return "If life expectancy keeps following the same general trend on planet <b class='overline'>" + _planet + "</b>, would you say that future generations on that planet can expect to live longer than their parents?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did life expectancy first go above <b class='overline'>" + _value + "</b>?";
					}else if(_distractor=="1"){
						return "When did life expectancy first go above <b class='overline'>" + _value + "</b> on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that the average life expectancy on industrialized planets in this galaxy is <b class='overline'>" + _value + "</b>, which of these planets fisrt benefited from the impact of industrialization?"
					}else if(_distractor=="1"){
						return "Knowing that the average life expectancy on industrialized planets in this galaxy is <b class='overline'>" + _value + "</b>, when would you say the impact of industrialization first affected life expectancy on planet <b class='overline'>" + _planet + "</b>?"
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What has the general average life expectancy been on this group of planets since the beginning of this time period?"
					}else if(_distractor=="1"){
						return "What has the average life expectancy been on planet <b class='overline'>" + _planet + "</b> since the beginning of this time period?"
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Among these planets, which has generally been the best place to be born since the beginning of this time period?"
					}else if(_distractor=="1"){
						return "Knowing that since the beginning of this time period the average life expectancy on similar planets has been <b class='overline'>" + _value + "</b>, would you say that people can hope to live longer on planet <b class='overline'>" + _planet + "</b>?"
					};

				};

			}else if(_task=="trendComp"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where has life expectancy increased the most since the beginning of this time period?"
					}else if(_distractor=="1"){
						return "When did the highest increase in life expectancy occur on planet <b class='overline'>" + _planet + "</b> since the beginning of this time period?"
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that clean water is vital and that at the beginning of this time period important water purification programs were set up, where did these programs have the biggest impact on life expectany?"
					}else if(_distractor=="1"){
						return "Knowing that since the beginning of this time period there has been a series of important medical advances, when do you think the most important advance took effect on planet <b class='overline'>" + _planet + "</b>?"
					};

				};

			};

		}else if(_data=="med"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did unemployment reach its highest peak since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "When was unemployment at its highest peak on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						// During this time period, which planet gained the inglorious title of “worst place to be looking for a job”?
						return "Which planet went through being the worst place to be looking for a job since the beginning of this time period?"
						//return "Where has the worst place to be looking for a job been?";
					}else if(_distractor=="1"){
						return "When was the worst time to be looking for a job on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did unemployment reach its lowest peak since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "When was unemployment at its lowest peak on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Which planet went through being the best place to be looking for a job since the beginning of this time period?"
					}else if(_distractor=="1"){
						return "When was the best time to be looking for a job on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Even though there has been some variation, has the unemployment trend generally increased on all of these planets since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "Even though there has been some variation, has the unemployment trend generally increased on planet <b class='overline'>" + _planet + "</b> since the beginning of this time period?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Even though there has been some variation in unemployment during this time period, overall do you think future generations of students will have an easier time finding a job on any one of these planets?"
						//return "If unemployment keeps following its general trend on each of these planets, would you say that future generations of students will have an easier time finding a job wherever they look?";
					}else if(_distractor=="1"){
						return "If unemployment keeps following the same general trend on planet <b class='overline'>" + _planet + "</b>, would you say that future generations of students on that planet will have an easier time finding a job when they enter the job market?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did unemployment first go above <b class='overline'>" + _value + "</b>?"
					}else if(_distractor=="1"){
						return "When did unemployment first go above <b class='overline'>" + _value + "</b> on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that an inter-planetary treaty aiming to bring unemployment rates down to <b class='overline'>" + _value + "</b>  was ratified by these planets, which is the only planet to have temporarely achieved this goal?";
					}else if(_distractor=="1"){
						return "Knowing that the local government on planet <b class='overline'>" + _planet + "</b> set up a plan to bring unemployment down to <b class='overline'>" + _value + "</b>, when do you think this plan first took effect?";
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What has the general average unemployment rate been on this group of planets since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "What has the average unemployment rate been on planet <b class='overline'>" + _planet + "</b> since the beginning of this time period?";
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
						return "Even though there has been some variation, where has the unemployment trend generally increased the most since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "When did the highest increase in the unemployment trend occur on planet <b class='overline'>" + _planet + "</b> since the beginning of this time period?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Which local government failed the most badly at containing unemployment since the beginning of this time period?";
					}else if(_distractor=="1"){
						return "Knowing that a major economic crisis occurred during this time period, when do you think the biggest redundancy plan took effect on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			};

		}else if(_data=="high"){

			if(_task=="max"){
				
				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where was the highest temperature recorded this year?";
					}else if(_distractor=="1"){
						return "When was it the hottest on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Where would people have most needed an air conditioning system for a single day this year?";
					}else if(_distractor=="1"){
						return "When would people have most needed an air conditioning system on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="min"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where was the lowest temperature recorded this year?";
					}else if(_distractor=="1"){
						return "When was it the coldest on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Where would people have most needed a heater?";
					}else if(_distractor=="1"){
						return "When would people have most needed a heater on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="trend"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Did the temperature generally rise around the middle of the year on each of these planets?";
					}else if(_distractor=="1"){
						return "Did the temperature generally rise around the middle of the year on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Does summer come roughly at the same time on each of these planets?";
					}else if(_distractor=="1"){
						return "Is summer in the middle of the year on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="intersection"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did the temperature first rise above <b class='overline'>" + _value + "</b>° this year?";
					}else if(_distractor=="1"){
						return "When did the temperature first rise above <b class='overline'>" + _value + "</b>° this year on planet <b class='overline'>" + _planet + "</b>?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that the average temperature during summer is <b class='overline'>" + _value + "</b>°, which planet had summer-like temperatures closest to the beginning of the year?";
					}else if(_distractor=="1"){
						return "Knowing that local residents consider it to be hot when the temperature exceeds <b class='overline'>" + _value + "</b>°, what was the first hot day of the year on planet <b class='overline'>" + _planet + "</b>?";
					};

				};

			}else if(_task=="average"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "What has the general average temperature been on this group of planets since the beginning of the year?";
					}else if(_distractor=="1"){
						return "What has the average temperature been on planet <b class='overline'>" + _planet + "</b> since the beginning of the year?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Among these planets, which is the one where an air conditioning system is most needed throughout the year?";
					}else if(_distractor=="1"){
						return "Looking at the average temperature of all of these planets, would you say that planet <b class='overline'>" + _planet + "</b> is particularly hot?";
					};

				};

			}else if(_task=="trendComp"){

				if(_question=="interpretation"){

					if(_distractor=="0"){
						return "Where did temperature increase the most during the year?";
					}else if(_distractor=="1"){
						return "When did the biggest increase in temperature occur on planet <b class='overline'>" + _planet + "</b> since the beginning of the year?";
					};

				}else if(_question=="extrapolation"){

					if(_distractor=="0"){
						return "Knowing that planets where the temperature varies a lot are inhospitable, where would the worst place to settle be?";
					}else if(_distractor=="1"){
						return "Knowing that when the temperature rises air conditioner sales increase, when would you say that air conditioning businesses had their biggest growth in sales on planet <b class='overline'>" + _planet + "</b>?";
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

function startENDSCENARIO(){
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
