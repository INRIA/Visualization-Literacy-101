<?php

$sessID = $_GET["id"];

$to = "myjyby@gmail.com";
$subject = "VL_study_completed";
$message = "MTurk participant = ".$sessID;
$from = "vl101_final_TURK";
$headers = "From:" .$from;
mail($to,$subject,$message,$headers);
		
?>

<!DOCTYPE HTML>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />

<html>
<head>
	<title>VL STUDY</title>

	<!-- JS LIBS -->
	<script type="text/javascript" src="../../libs/d3.js"></script>
	<script type="text/javascript" src="../../libs/jquery.js"></script>

	<!-- DRAWING FUNCTIONS -->
	<script type="text/javascript" src="js/general.functions.js"></script>
	<script type="text/javascript" src="js/set.trial.js"></script>

	<!-- TRACES -->
	<script type="text/javascript" src="../../trace/trace_test_130529.js"></script>

	<!-- CSS LIBS -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/css.css">
</head>

<body>

	<div id="container">
		<div id="header" class="full-width header-height">
			<p></p>
		</div>

		<div id="chart-container" class="full-width svg-height">
		</div>

		<div id="spacer" class="full-width spacer-height">
			<p></p>
		</div>

		<div id="button-container" class="full-width btn-group">
		</div>
	</div>

	<script type="text/javascript">

		var _uuid = getParameterByName("id");

		if(_uuid==undefined){
			_uuid = "If your ID does not show here, please retrive it from the url (?id=…).";
		}

		console.log(_uuid)

		// START AT SCENARIO	
		d3.select("#header")
		.style("height","585px")
		.select("p")
		.style("margin-top","200px");		
		startENDSCENARIO(_uuid);

	</script>

</body>

</html>