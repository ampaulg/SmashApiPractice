//gets name from id
//takes id from "entry" box
//returns name in "results1"
function getName(){

	var element = document.getElementById("results1");
	var entry = document.getElementById("entry").value;

	//check if input is in the right range
	if ((entry>58)||(entry<1)){
		element.innerHTML = "Invalid number";
		return;
	}

	//make the argument for api open function
	var str1 = "http://api.kuroganehammer.com/api/Characters/";
	var str2 = entry.toString();
	var str3 = "?fields=name";

	str1 = str1.concat(str2);
	str1 = str1.concat(str3);

	//get value from API
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", str1, false );
    xmlHttp.send( null );

    //get the name from the JSON object
	element.innerHTML = JSON.parse(xmlHttp.responseText).name;
}