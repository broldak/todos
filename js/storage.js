if (Modernizr.localstorage){

	function store (key, val){
		localStorage[key] = val;
		console.log(localStorage);
	}
	
}
else{
	alert("GOODBYE");
}