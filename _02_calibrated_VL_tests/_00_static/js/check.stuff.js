var _ans_array = new Array();

function checkANSWER(ans){

	if(_trial==0){
		var correct = _environment.AnsTable;
	}else{
		var correct = _environment.Ans;
	};

	if(ans==correct){
		var err = 1;
	}else{
		var err = 0;
	};

	_ans_array[parseInt(_environment.Block)-1][parseInt(_environment.Trial)] = err;

	console.log("Score: " + err);

	return null;
};

function checkDEMOGRAPHICSURVEY(){
	if(findSelection("gender") == ""){
		d3.select(".gender")
		.select("p").style("color","#c43b1d");
		alert("Please indicate your gender.");
		return false;
	}else{
		d3.select(".gender")
		.select("p").style("color",null);
	};

	if(findOption("nationality-sel") == null){
		d3.select(".nationality")
		.select("p").style("color","#c43b1d");
		alert("Please indicate your nationality.");
		return false;
	}else{
		d3.select(".nationality")
		.select("p").style("color",null);
	};

	if(findOption("age-sel") == null){
		d3.select(".age")
		.select("p").style("color","#c43b1d");
		alert("Please indicate your age.");
		return false;
	}else{
		d3.select(".age")
		.select("p").style("color",null);
	};

	if(findSelection("language") == ""){
		d3.select(".language")
		.select("p").style("color","#c43b1d");
		alert("Please indicate if english is your first language.");
		return false;
	}else{
		d3.select(".language")
		.select("p").style("color",null);
	};

	if(findOption("degree-sel") == null){
		d3.select(".degree")
		.select("p").style("color","#c43b1d");
		alert("Please indicate your level of education.");
		return false;
	}else{
		d3.select(".degree")
		.select("p").style("color",null);
	};

	if(findOption("occupation-sel") == null){
		d3.select(".occupation")
		.select("p").style("color","#c43b1d");
		alert("Please indicate your professional or employment status.");
		return false;
	}else{
		d3.select(".occupation")
		.select("p").style("color",null);
	};

	if(findSelection("visual-verbal") == ""){
		d3.select(".thinker")
		.select("p").style("color","#c43b1d");
		alert("Please indicate whether you think you are a visual thinker or a verbal thinker.");
		return false;
	}else{
		d3.select(".thinker")
		.select("p").style("color",null);
	};

	if(findSelection("v-deficiency") == ""){
		d3.select(".deficiency")
		.select("p").style("color","#c43b1d");
		alert("Please indicate if you have a visual disability.");
		return false;
	}else{
		d3.select(".deficiency")
		.select("p").style("color",null);
	};

	if(findOption("input-d-sel") == null){
		d3.select(".input-device")
		.select("p").style("color","#c43b1d");
		alert("Please indicate what input device you are using.");
		return false;
	}else{
		d3.select(".input-device")
		.select("p").style("color",null);
	};

	console.log("Examinee_gender: " + String(findSelection("gender")));
	console.log("Examinee_residence: " + String(findOption("nationality-sel")));
	console.log("Examinee_age: " + String(findOption("age-sel")));
	console.log("Examinee_english_native: " + String(findSelection("language")));
	console.log("Examinee_education: " + String(findOption("degree-sel")));
	console.log("Examinee_employment: " + String(findOption("occupation-sel")));
	console.log("Examinee_thinker: " + String(findSelection("visual-verbal")));
	console.log("Examinee_visual_impairment: " + String(findSelection("v-deficiency")));
	console.log("Examinee_equipment: " + String(findOption("input-d-sel")));

	return true;
};



function checkCONFIDENCESURVEY(){
	
	for(var _i=1; _i<7; _i++){
		if(findSelection("c-"+_i) == ""){
			d3.select(".c-"+_i)
			.select("p").style("color","#c43b1d");
			alert("Please answer question [" + _i + "/6].");
			return false;
		}else{
			d3.select(".c-"+_i)
			.select("p").style("color",null);
		};

		console.log("Confidence_rating_repetition" + _i + ": " + String(findSelection("c-"+_i)));
	};

	return true;
};