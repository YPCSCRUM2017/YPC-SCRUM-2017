window.onload = function(){

	var page = location.pathname;
	console.log(page);
	var highlight = document.getElementById(page + "_link");
	highlight.className = "active";

}

