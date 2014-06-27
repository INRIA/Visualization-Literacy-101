function setDEMOGRAPHICSURVEY(data){
	var _stage = d3.select("#chart-container")
		.append("div")
		.attr("class","s-container");

	_stage.append("p")
	.attr("class","text-error legal")
	.html("Please fill everything in.");

	
	// BLOCK 1: BASIC INFORMATION
	_stage.append("div")
	.attr("class","s-title")
	.html("Basic Information");

	// PART 1: SEX OF PARTICIPANT
	var _b1 = _stage.append("div")
		.attr("class","s-block gender");
	_b1.append("p")
	.html("What is your gender?");

	var _b1_ul1 = _b1.append("ul")
		.attr("class","unstyled inline");

	var _b1_ul1_li1 = _b1_ul1.append("li");
	_b1_ul1_li1.append("input")
	.attr("name","gender")
	.attr("id","i-male")
	.attr("type","radio")
	.attr("value","Male")
	.style("margin-right","10px");
	_b1_ul1_li1.append("label")
	.attr("for","i-male")
	.style("margin-right","20px")
	.append("small")
	.html("Male");

	var _b1_ul1_li2 = _b1_ul1.append("li");
	_b1_ul1_li2.append("input")
	.attr("name","gender")
	.attr("id","i-female")
	.attr("type","radio")
	.attr("value","Female")
	.style("margin-right","10px");
	_b1_ul1_li2.append("label")
	.attr("for","i-female")
	.style("margin-right","20px")
	.append("small")
	.html("Female");

	// PART 2: NATIONALITY OF PARTICIPANT
	var _b2 = _stage.append("div")
		.attr("class","s-block nationality");
	_b2.append("p")
	.html("Where has your main place of residence been for the past 2 years?");

	var _b2_ul1 = _b2.append("ul")
		.attr("class","unstyled inline");

	var _b2_ul1_li1 = _b2_ul1.append("li");

	var _b2_ul1_li1_sel = _b2_ul1_li1.append("select")
		.attr("id","nationality-sel");
	_b2_ul1_li1_sel.selectAll("option")
	.data(world)
	.enter()
	.append("option")
	.attr("name","nationality")
	.attr("value",function(d){
		return d;
	})
	.html(function(d){
		return d;
	});

	// PART 3: AGE OF PARTICIPANT
	var _b3 = _stage.append("div")
		.attr("class","s-block age");
	_b3.append("p")
	.html("How old are you?");

	var _b3_ul1 = _b3.append("ul")
		.attr("class","unstyled inline");

	var _b3_ul1_li1 = _b3_ul1.append("li");

	var _b3_ul1_li1_sel = _b3_ul1_li1.append("select")
		.attr("id","age-sel");
	_b3_ul1_li1_sel.selectAll("option")
	.data(ages)
	.enter()
	.append("option")
	.attr("name","age")
	.attr("value",function(d){
		return d;
	})
	.html(function(d){
		return d;
	});

	// PART 4: LANGUAGE OF PARTICIPANT
	var _b4 = _stage.append("div")
		.attr("class","s-block language");
	_b4.append("p")
	.html("Is english your first language?");		

	var _b4_ul1 = _b4.append("ul")
		.attr("class","unstyled inline");

	var _b4_ul1_li1 = _b4_ul1.append("li");
	_b4_ul1_li1.append("input")
	.attr("name","language")
	.attr("id","i-en-true")
	.attr("type","radio")
	.attr("value","Yes")
	.style("margin-right","10px");
	_b4_ul1_li1.append("label")
	.attr("for","i-en-true")
	.style("margin-right","20px")
	.append("small")
	.html("Yes");

	var _b4_ul1_li2 = _b4_ul1.append("li");
	_b4_ul1_li2.append("input")
	.attr("name","language")
	.attr("id","i-en-false")
	.attr("type","radio")
	.attr("value","No")
	.style("margin-right","10px");
	_b4_ul1_li2.append("label")
	.attr("for","i-en-false")
	.style("margin-right","20px")
	.append("small")
	.html("No");


	// BLOCK 2: EDUCATION AND OCCUPATION INFORMATION
	_stage.append("div")
	.attr("class","s-title")
	.html("Education and Occupation");

	// PART 5: DEGREE OF PARTICIPANT
	var _b5 = _stage.append("div")
		.attr("class","s-block degree");
	_b5.append("p")
	.style("margin-bottom",0)
	.html("What is the highest degree or level of school you have completed?");

	_b5.append("p")
	.attr("class","muted no-decoration ital")
	.html("If currently enrolled, highest degree received.");

	var _b5_ul1 = _b5.append("ul")
		.attr("class","unstyled inline");

	var _b5_ul1_li1 = _b5_ul1.append("li");

	var _b5_ul1_li1_sel = _b5_ul1_li1.append("select")
		.attr("id","degree-sel");
	_b5_ul1_li1_sel.selectAll("option")
	.data(degrees)
	.enter()
	.append("option")
	.attr("name","degree")
	.attr("value",function(d){
		return d;
	})
	.html(function(d){
		return d;
	});

	// PART 6: OCCUPATION OF PARTICIPANT
	var _b6 = _stage.append("div")
		.attr("class","s-block occupation");
	_b6.append("p")
	.html("What is your current professional or employment status?");

	var _b6_ul1 = _b6.append("ul")
		.attr("class","unstyled inline");

	var _b6_ul1_li1 = _b6_ul1.append("li");

	var _b6_ul1_li1_sel = _b6_ul1_li1.append("select")
		.attr("id","occupation-sel");
	_b6_ul1_li1_sel.selectAll("option")
	.data(occupations)
	.enter()
	.append("option")
	.attr("name","occupation")
	.attr("value",function(d){
		return d;
	})
	.html(function(d){
		return d;
	});

	// BLOCK 3: WAY OF THINKING INFORMATION
	_stage.append("div")
	.attr("class","s-title")
	.html("Visual or Verbal");

	// PART 7: VISUAL OR VERBAL PARTICIPANT
	var _b7 = _stage.append("div")
		.attr("class","s-block thinker");
	_b7.append("p")
	.html("Do you consider yourself to be a visual thinker or a verbal thinker?");

	var _b7_ul1 = _b7.append("ul")
		.attr("class","unstyled inline");

	var _b7_ul1_li1 = _b7_ul1.append("li");
	_b7_ul1_li1.append("input")
	.attr("name","visual-verbal")
	.attr("id","i-visual")
	.attr("type","radio")
	.attr("value","Visual")
	.style("margin-right","10px");
	_b7_ul1_li1.append("label")
	.attr("for","i-visual")
	.style("margin-right","20px")
	.append("small")
	.html("Visual");

	var _b7_ul1_li2 = _b7_ul1.append("li");
	_b7_ul1_li2.append("input")
	.attr("name","visual-verbal")
	.attr("id","i-verbal")
	.attr("type","radio")
	.attr("value","Verbal")
	.style("margin-right","10px");
	_b7_ul1_li2.append("label")
	.attr("for","i-verbal")
	.style("margin-right","20px")
	.append("small")
	.html("Verbal");


	// BLOCK 4: VISUAL DEFICIENCY INFORMATION
	_stage.append("div")
	.attr("class","s-title")
	.html("Visual Impairments");

	// PART 8: WAY OF THINKING OF PARTICIPANT
	var _b8 = _stage.append("div")
		.attr("class","s-block deficiency");
	_b8.append("p")
	.style("margin-bottom",0)
	.html("Do you have any kind of visual impairment?");

	_b8.append("p")
	.attr("class","muted no-decoration ital")
	.html("If your sight is corrected with glasses or lenses, please add “Corrected to normal” in the “Other” textfield.<br/> "+
		"If you are color-blind, please stop this HIT now. We are sorry but we need participants to be able to perceive different colors.");

	var _b8_ul1 = _b8.append("ul")
		.attr("class","unstyled inline");

	var _b8_ul1_li1 = _b8_ul1.append("li");
	_b8_ul1_li1.append("input")
	.attr("name","v-deficiency")
	.attr("id","i-no-pb")
	.attr("type","checkbox")
	.attr("value","No")
	.style("margin-right","10px");
	_b8_ul1_li1.append("label")
	.attr("for","i-no-pb")
	.style("margin-right","20px")
	.append("small")
	.html("No");

	var _b8_ul1_li2 = _b8_ul1.append("li");
	_b8_ul1_li2.append("input")
	.attr("name","v-deficiency")
	.attr("id","i-low-vision")
	.attr("type","checkbox")
	.attr("value","Low Vision")
	.style("margin-right","10px");
	_b8_ul1_li2.append("label")
	.attr("for","i-low-vision")
	.style("margin-right","20px")
	.append("small")
	.html("Low Vision");

	var _b8_ul1_li3 = _b8_ul1.append("li");
	_b8_ul1_li3.append("label")
	.attr("for","i-other-pb")
	.style("margin-right","20px")
	.style("margin-top","3px")
	.append("small")
	.html("Other");
	_b8_ul1_li3.append("input")
	.attr("name","v-deficiency")
	.attr("id","i-other-pb")
	.attr("type","text")
	.style("margin-bottom",0);	


	// BLOCK 5: INPUT DEVICE INFORMATION
	_stage.append("div")
	.attr("class","s-title")
	.html("Equipment");

	// PART 9: DEVICE OF PARTICIPANT
	var _b9 = _stage.append("div")
		.attr("class","s-block input-device");
	_b9.append("p")
	.html("What kind of input device are you using?");

	var _b9_ul1 = _b9.append("ul")
		.attr("class","unstyled inline");

	var _b9_ul1_li1 = _b9_ul1.append("li");

	var _b9_ul1_li1_sel = _b9_ul1_li1.append("select")
		.attr("id","input-d-sel");
	_b9_ul1_li1_sel.selectAll("option")
	.data(input_devices)
	.enter()
	.append("option")
	.attr("name","input-d")
	.attr("value",function(d){
		return d;
	})
	.html(function(d){
		return d;
	});

	addSUBMITDEMOGRAPHICSURVEY(data);

	trace.event("_demographic_survey","load","display",true);

	return null;
};


function setCONFIDENCESURVEY(data){

	// CLEAR THE FOOTER INFO
	d3.select("#footer")
	.selectAll("p")
	.html(null);

	var _stage = d3.select("#chart-container")
		.append("div")
		.attr("class","s-container");

	_stage.append("p")
	.attr("class","text-error legal")
	.html("Please fill everything in.");
	
	// BLOCK 1: CONFIDENCE INFORMATION
	_stage.append("div")
	.attr("class","s-title")
	.html("Please give us an estimate of your confidence level");

	// PART 1
	var _b1 = _stage.append("div")
		.attr("class","s-block c-1");
	_b1.append("p")
	.html("For the first answer (table condition)");

	var _b1_t1 = _b1.append("table")
	.attr("class","table")
	.style("width","400px")

	var _b1_t1_tr1 = _b1_t1.append("tr");

	_b1_t1_tr1.append("td");
	_b1_t1_tr1.append("td")
	.html("1");
	_b1_t1_tr1.append("td")
	.html("2");
	_b1_t1_tr1.append("td")
	.html("3");
	_b1_t1_tr1.append("td")
	.html("4");
	_b1_t1_tr1.append("td")
	.html("5");
	_b1_t1_tr1.append("td");

	var _b1_t1_tr2 = _b1_t1.append("tr");
	_b1_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Not at all");
	_b1_t1_tr2.append("td")
	.append("input")
	.attr("name","c-1")
	.attr("type","radio")
	.attr("value",1);
	_b1_t1_tr2.append("td")
	.append("input")
	.attr("name","c-1")
	.attr("type","radio")
	.attr("value",2);
	_b1_t1_tr2.append("td")
	.append("input")
	.attr("name","c-1")
	.attr("type","radio")
	.attr("value",3);
	_b1_t1_tr2.append("td")
	.append("input")
	.attr("name","c-1")
	.attr("type","radio")
	.attr("value",4);
	_b1_t1_tr2.append("td")
	.append("input")
	.attr("name","c-1")
	.attr("type","radio")
	.attr("value",5);
	_b1_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Very confident");

	// PART 2
	var _b2 = _stage.append("div")
		.attr("class","s-block c-2");
	_b2.append("p")
	.html("For the second answer");

	var _b2_t1 = _b2.append("table")
	.attr("class","table")
	.style("width","400px")

	var _b2_t1_tr1 = _b2_t1.append("tr");

	_b2_t1_tr1.append("td");
	_b2_t1_tr1.append("td")
	.html("1");
	_b2_t1_tr1.append("td")
	.html("2");
	_b2_t1_tr1.append("td")
	.html("3");
	_b2_t1_tr1.append("td")
	.html("4");
	_b2_t1_tr1.append("td")
	.html("5");
	_b2_t1_tr1.append("td");

	var _b2_t1_tr2 = _b2_t1.append("tr");
	_b2_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Not at all");
	_b2_t1_tr2.append("td")
	.append("input")
	.attr("name","c-2")
	.attr("type","radio")
	.attr("value",1);
	_b2_t1_tr2.append("td")
	.append("input")
	.attr("name","c-2")
	.attr("type","radio")
	.attr("value",2);
	_b2_t1_tr2.append("td")
	.append("input")
	.attr("name","c-2")
	.attr("type","radio")
	.attr("value",3);
	_b2_t1_tr2.append("td")
	.append("input")
	.attr("name","c-2")
	.attr("type","radio")
	.attr("value",4);
	_b2_t1_tr2.append("td")
	.append("input")
	.attr("name","c-2")
	.attr("type","radio")
	.attr("value",5);
	_b2_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Very confident");

	// PART 3
	var _b3 = _stage.append("div")
		.attr("class","s-block c-3");
	_b3.append("p")
	.html("For the third answer");

	var _b3_t1 = _b3.append("table")
	.attr("class","table")
	.style("width","400px")

	var _b3_t1_tr1 = _b3_t1.append("tr");

	_b3_t1_tr1.append("td");
	_b3_t1_tr1.append("td")
	.html("1");
	_b3_t1_tr1.append("td")
	.html("2");
	_b3_t1_tr1.append("td")
	.html("3");
	_b3_t1_tr1.append("td")
	.html("4");
	_b3_t1_tr1.append("td")
	.html("5");
	_b3_t1_tr1.append("td");

	var _b3_t1_tr2 = _b3_t1.append("tr");
	_b3_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Not at all");
	_b3_t1_tr2.append("td")
	.append("input")
	.attr("name","c-3")
	.attr("type","radio")
	.attr("value",1);
	_b3_t1_tr2.append("td")
	.append("input")
	.attr("name","c-3")
	.attr("type","radio")
	.attr("value",2);
	_b3_t1_tr2.append("td")
	.append("input")
	.attr("name","c-3")
	.attr("type","radio")
	.attr("value",3);
	_b3_t1_tr2.append("td")
	.append("input")
	.attr("name","c-3")
	.attr("type","radio")
	.attr("value",4);
	_b3_t1_tr2.append("td")
	.append("input")
	.attr("name","c-3")
	.attr("type","radio")
	.attr("value",5);
	_b3_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Very confident");

	// PART 4
	var _b4 = _stage.append("div")
		.attr("class","s-block c-4");
	_b4.append("p")
	.html("For the fourth answer");

	var _b4_t1 = _b4.append("table")
	.attr("class","table")
	.style("width","400px")

	var _b4_t1_tr1 = _b4_t1.append("tr");

	_b4_t1_tr1.append("td");
	_b4_t1_tr1.append("td")
	.html("1");
	_b4_t1_tr1.append("td")
	.html("2");
	_b4_t1_tr1.append("td")
	.html("3");
	_b4_t1_tr1.append("td")
	.html("4");
	_b4_t1_tr1.append("td")
	.html("5");
	_b4_t1_tr1.append("td");

	var _b4_t1_tr2 = _b4_t1.append("tr");
	_b4_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Not at all");
	_b4_t1_tr2.append("td")
	.append("input")
	.attr("name","c-4")
	.attr("type","radio")
	.attr("value",1);
	_b4_t1_tr2.append("td")
	.append("input")
	.attr("name","c-4")
	.attr("type","radio")
	.attr("value",2);
	_b4_t1_tr2.append("td")
	.append("input")
	.attr("name","c-4")
	.attr("type","radio")
	.attr("value",3);
	_b4_t1_tr2.append("td")
	.append("input")
	.attr("name","c-4")
	.attr("type","radio")
	.attr("value",4);
	_b4_t1_tr2.append("td")
	.append("input")
	.attr("name","c-4")
	.attr("type","radio")
	.attr("value",5);
	_b4_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Very confident");

	// PART 5
	var _b5 = _stage.append("div")
		.attr("class","s-block c-5");
	_b5.append("p")
	.html("For the fifth answer");

	var _b5_t1 = _b5.append("table")
	.attr("class","table")
	.style("width","400px")

	var _b5_t1_tr1 = _b5_t1.append("tr");

	_b5_t1_tr1.append("td");
	_b5_t1_tr1.append("td")
	.html("1");
	_b5_t1_tr1.append("td")
	.html("2");
	_b5_t1_tr1.append("td")
	.html("3");
	_b5_t1_tr1.append("td")
	.html("4");
	_b5_t1_tr1.append("td")
	.html("5");
	_b5_t1_tr1.append("td");

	var _b5_t1_tr2 = _b5_t1.append("tr");
	_b5_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Not at all");
	_b5_t1_tr2.append("td")
	.append("input")
	.attr("name","c-5")
	.attr("type","radio")
	.attr("value",1);
	_b5_t1_tr2.append("td")
	.append("input")
	.attr("name","c-5")
	.attr("type","radio")
	.attr("value",2);
	_b5_t1_tr2.append("td")
	.append("input")
	.attr("name","c-5")
	.attr("type","radio")
	.attr("value",3);
	_b5_t1_tr2.append("td")
	.append("input")
	.attr("name","c-5")
	.attr("type","radio")
	.attr("value",4);
	_b5_t1_tr2.append("td")
	.append("input")
	.attr("name","c-5")
	.attr("type","radio")
	.attr("value",5);
	_b5_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Very confident");

	// PART 5
	var _b6 = _stage.append("div")
		.attr("class","s-block c-6");
	_b6.append("p")
	.html("For the sixth answer");

	var _b6_t1 = _b6.append("table")
	.attr("class","table")
	.style("width","400px")

	var _b6_t1_tr1 = _b6_t1.append("tr");

	_b6_t1_tr1.append("td");
	_b6_t1_tr1.append("td")
	.html("1");
	_b6_t1_tr1.append("td")
	.html("2");
	_b6_t1_tr1.append("td")
	.html("3");
	_b6_t1_tr1.append("td")
	.html("4");
	_b6_t1_tr1.append("td")
	.html("5");
	_b6_t1_tr1.append("td");

	var _b6_t1_tr2 = _b6_t1.append("tr");
	_b6_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Not at all");
	_b6_t1_tr2.append("td")
	.append("input")
	.attr("name","c-6")
	.attr("type","radio")
	.attr("value",1);
	_b6_t1_tr2.append("td")
	.append("input")
	.attr("name","c-6")
	.attr("type","radio")
	.attr("value",2);
	_b6_t1_tr2.append("td")
	.append("input")
	.attr("name","c-6")
	.attr("type","radio")
	.attr("value",3);
	_b6_t1_tr2.append("td")
	.append("input")
	.attr("name","c-6")
	.attr("type","radio")
	.attr("value",4);
	_b6_t1_tr2.append("td")
	.append("input")
	.attr("name","c-6")
	.attr("type","radio")
	.attr("value",5);
	_b6_t1_tr2.append("td")
	.append("span")
	.attr("class","muted")
	.html("Very confident");

	addSUBMITCONFIDENCESURVEY(data);

	trace.event("_confidence_survey","load","display",true);

	return null;

};