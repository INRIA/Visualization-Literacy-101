function removeSVG(){
	d3.select("svg").remove();
	d3.selectAll(".btn-ans").remove();
	d3.selectAll(".btn-proceed").remove();
	d3.select(".table").remove();
	d3.select(".table-title").remove();

	return null;
};