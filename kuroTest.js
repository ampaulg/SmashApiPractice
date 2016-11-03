function makeSelect(){
	
	//get teh JSON object containing all the characters and IDs
	var str1 = "http://api.kuroganehammer.com/api/Characters?fields=name%2Cid";
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", str1, false );
    //xmlHttp.send( null );
    var characterArr = JSON.parse(xmlHttp.responseText);
    var length = characterArr.length;

    //make the selection box
    var str2 = '<select id="entry">';
    var str3;
    for (i=0; i<length;i++){
    	str2 = str2.concat('<option value=');
    	str3 = characterArr[i].id.toString();
    	str2 = str2.concat(str3);
        str2 = str2.concat('>');
        str2 = str2.concat(characterArr[i].name);
        str2 = str2.concat("</option>");
    }
    str2 = str2.concat("</select>");
    
    var element = document.getElementById("selectBox");
	element.innerHTML = str2;
}


//gets name and special moves from id
//takes id from selection box
//returns name in results1
//		  number of moves in results2
//		  list of specials in results3
//		  the full JSON text in results4
function getInfo(){

	var element = document.getElementById("results1");
	var select = document.getElementById("entry");
    var entry = select.options[select.selectedIndex].value;
    element.innerHTML = entry;
	//check if input is in the right range
	if ((entry>58)||(entry<1)){
		//element.innerHTML = "Invalid number";
		//element.innerHTML = entry;
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

	element = document.getElementById("results2");

	str1 = "http://api.kuroganehammer.com/api/Characters/";
	str3 = "/moves?fields=name%2Ctype%2ChitboxActive%2CfirstActionableFrame%2CbaseDamage%2C";

	str1 = str1.concat(str2);
	str1 = str1.concat(str3);

	//get value from API
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", str1, false );
    xmlHttp.send( null );

    var moveArr = JSON.parse(xmlHttp.responseText);
    var length = moveArr.length;
	element.innerHTML = length.toString();
	element = document.getElementById("results4");
	element.innerHTML = xmlHttp.responseText;
	
	element = document.getElementById("results3");
	
	var out = "";
	for (i=0; i<length;i++){
        if (moveArr[i].type==2){
			out = out.concat(moveArr[i].name);
			out = out.concat("<br/>");
	    }
	}
	element.innerHTML = out;
}