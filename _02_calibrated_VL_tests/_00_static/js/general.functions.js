function findSelection(field) {
    var test = document.getElementsByName(field);
    var sizes = test.length;
    // IN CASE THE FUNCTION APPLIES TO A CHECKBOX FORM
	var answers = new Array();

    for (i=0; i < sizes; i++) {
    	var type = test[i].getAttribute("type");
		if(type !== "text"){	
	        if (test[i].checked==true) {
	            answers.push(test[i].value);
	        }
	    }else{
	    	answers.push(test[i].value);
	    }
    }
    return answers;
};

function findOption(field) {
    var test = document.getElementById(field);
    var answers = test.options[test.selectedIndex].value;
    if(answers !== "Select"){
    	return answers
    }else{
		return null;
	};
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};



/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleTRIALS(array) {
    for (var i = array.length - 1; i > 1; i--) {
        var j = 1 + Math.floor(Math.random() * (i));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

function shuffleBLOCKS(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};