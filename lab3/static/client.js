function initiate() {
	if (isLoggedIn()) {
		console.log("you are logged in");
		showProfileView();

		}
	else {
		console.log("you are not logged in");
		showWelcomeView();
	}
}

//copies the content of welcome view and puts it in the content tag.
function showWelcomeView() {
	document.getElementById('content').innerHTML=(document.getElementById('welcomeview').innerHTML);
}

function showProfileView() {
	document.getElementById('content').innerHTML=(document.getElementById('profileview').innerHTML);
	updateHomeWall();
	updateUserInfo();
}

function sendPostRequest(method,url,params) {

var http = new XMLHttpRequest();
http.open("POST", url, true);
//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        //console.log(http.responseText);
		//do something with data here
		res = JSON.parse(http.responseText)
		
		//console.log(method + " method called!");
		
			//do different depending on called method, implement as more methods are added
		switch(method){
			case "findUser":
				//set the browse variable to tell what person the user is looking at
				if(res.success) {
					localStorage.browse = params.split("&email=")[1];
					
					//split and store the user data
					data = res.data.split("#");

					dict = {
					"email" : data[0],
					"firstname" : data[2],
					"familyname" : data[3],
					"gender" : data[4],
					"city" : data[5],
					"country" : data[6]
					};
				
					localStorage.browseinfo = JSON.stringify(dict);
					
					//
					updateBrowseInfo();
					
					
					sendPostRequest("findUserMessages","http://localhost:5000/get_user_messages_by_email","token="+localStorage.token+"&email="+localStorage.browse);
				}
				else {
					console.log(res.message);
				}
				
				
				break;
			
			case "findUserMessages":
				
				if(res.success) {
					localStorage.browseMessages = JSON.stringify(res.data);
					updateBrowseWall();
				}
				else {
					console.log(res.message);
				}
				
				break;
				
			case "signIn":
				
				//set the message1-span to display error message
				document.getElementById('message1').innerHTML = res.message;
				
				//store token locally if success..
				if (res['success']) {
					localStorage.token=res.data;
					location.reload();
				}
				else {
					redborder(form.email);
					redborder(form.password);
				}
					
				break;
			
			case "homeWall":
				
				if (res['success']) {
					localStorage.userMessages = JSON.stringify(res.data);
					updateHomeWall();
					
				} else {
					console.log(res.message + " ; could not find a user bearing that token - have you sent a valid one?");
				}
				break;
			
			case "userData":
			
				if (res['success']) {

					//split and store the user data
					data = res.data.split("#");

					dict = {
					"email" : data[0],
					"firstname" : data[2],
					"familyname" : data[3],
					"gender" : data[4],
					"city" : data[5],
					"country" : data[6]
					};
				
					localStorage.userinfo = JSON.stringify(dict);
					
					
					updateUserInfo();
				} else {
					console.log(res.message + " ; could not find a user bearing that token - have you sent a valid one?");
				}
				break;
			
			case "postMessage":
				if (res['success']) {
					localStorage.removeItem('userMessages');
					updateHomeWall();
					document.getElementById("usermessage").value="";
					document.getElementById("browsemsg").value="";
				} else {
					console.log(res.message);
				}
				break;
				
			case "logout":
				if (res['success']) {
				localStorage.clear();
				location.reload();
				} else {
				console.log(res.message);
				}
				break;
				
			case "signUp":
				
				document.getElementById('message2').innerHTML = res['message'];
				form = document.getElementById('signupform');
				
				if (res['success']) {
					
					console.log(res.message);
					
					form.email.value="";
					form.password.value="";
					form.password2.value="";
					form.firstname.value="";
					form.familyname.value="";
					form.gender.value="";
					form.city.value="";
					form.country.value="";
					
				}
				
				else { //redborder all cells in sign up if unsuccessful
					
					redborder(form.email);
					redborder(form.password);
					redborder(form.password2);
					redborder(form.firstname);
					redborder(form.familyname);
					redborder(form.gender);
					redborder(form.city);
					redborder(form.country);
				}
						
				break;
				
			default:
				console.log("no correct method called in server =>  do nothing!");
				break;
		}
	
		


	
	}
	else if(http.readyState == 4 && http.status == 404) {
		console.log("404: page not found");
	}
}

if (params) {
	http.send(params);	
} else {
	http.send()
}

}

function findUser(form) {
	
	email = form.email.value;
	sendPostRequest("findUser","http://localhost:5000/get_user_data_by_email","token="+localStorage.token+"&email="+email);
	
	return false;
}

//sends message to own wall
function sendMessage(form) {
	
	msg = form.message.value;
	sendPostRequest("postMessage","http://localhost:5000/post_message","recipient="+localStorage.token+"&message="+msg);

	return false;
}

//sends message to other wall
function sendBrowseMessage(form) {
	
	//post message
	//replace with xmlhtml
	msg = form.message.value;
	sendPostRequest("postMessage","http://localhost:5000/post_message","recipient="+localStorage.browse+"&message="+msg);
	
	//not the best implementation here since two Post packets are sent to update the wall async., 
	//implementation demands it however. Would've been better implemented with more time.
	sendPostRequest("findUser","http://localhost:5000/get_user_data_by_email","token="+localStorage.token+"&email="+localStorage.browse);
	
	
	return false;
}



//present/update the user's static info
function updateUserInfo() {
	
	//replace with xmlhtml
	if (localStorage.userinfo) {
		
		result = JSON.parse(localStorage.userinfo);
		
		html = "";
		
		html += " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Name: </td> <td> Gender: </td>  <td> City: </td> </tr> <tr> <td>" + result.email + "</td> <td>" + result.firstname + " " + result.familyname + "</td> <td>" + result.gender + "</td> <td>" + result.city + "</td> </tr> </table>"
		
		
		document.getElementById('userinfo').innerHTML=html;
	}
	else {
		sendPostRequest("userData","http://localhost:5000/get_user_data_by_token","token="+localStorage.token);
	}
	
	
}

//helpfunction that converts the messages in localstorage to right format for the homewall and browsewall functions
function msgToFormat(stringifiedStorage){

	res = JSON.parse(stringifiedStorage);
		
	o = []
	contentarr = res.content.split("#");
	writerarr = res.writer.split("#");

	var i;
	for (i = 0; i < contentarr.length-1; i++) {
		o.push({"writer" : writerarr[i], "content" : contentarr[i]});
	}

	return o;
}

//updates the user's home wall
function updateHomeWall() {

	if (localStorage.userMessages) { 
	
		result = msgToFormat(localStorage.userMessages);
		
		document.getElementById('messageboard').innerHTML="";
		
		html = "";
		
		for ( i=0; i<result.length; i++) {		
		
			html+= " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Message: </td> </tr> <tr> <td>" + result[i].writer + "</td> <td>" + result[i].content + "</td> </tr> </table>";
		}
		
		document.getElementById('messageboard').innerHTML=html;
		}	
	else {
		sendPostRequest("homeWall","http://localhost:5000/get_user_messages_by_token","token="+localStorage.token);
		}
	}

//updates the wall that is currently browsed
function updateBrowseWall() {

	if (localStorage.browse && localStorage.browseMessages) {
		
		result = msgToFormat(localStorage.browseMessages);
				
		document.getElementById('browseboard').innerHTML="";
		html = "";
		for ( i=0; i<result.length; i++) {		
			
			html+= " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Message: </td> </tr> <tr> <td>" + result[i].writer + "</td> <td>" + result[i].content + "</td> </tr> </table>";
		}
		document.getElementById('browseboard').innerHTML=html;	
		
		}
	else {
		console.log("ERROR: There is no browse or messages in localStorage, have you cleared the local data recently? Try searching for another user and see what happens.");
	}

}

function updateBrowseInfo() {

	result = JSON.parse(localStorage.browseinfo);
	
	
	html = "";
	
	html += " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Name: </td> <td> Gender: </td>  <td> City: </td> </tr> <tr> <td>" + result.email + "</td> <td>" + result.firstname + " " + result.familyname + "</td> <td>" + result.gender + "</td> <td>" + result.city + "</td> </tr> </table>"
	
	document.getElementById('browseinfo').innerHTML=html;

}

function isLoggedIn() {

	if (localStorage.token) {
		return true;
	}
	else {
	return false; 
	}
}

function logOut() {
	sendPostRequest("logout","http://localhost:5000/logout","")
}

function validateSignIn(form) {
	
	if (validate(form)) {
		
		email = form.email.value;
		password = form.password.value;
		
		//replace with xmlhtml
		sendPostRequest("signIn","http://localhost:5000/signin","email="+email+"&password="+password);
		return false;
	}
	else {
		return false;
	}
}

function validateSignUp(form) {
	
	if (validate(form) && compare_pwd(form)) {
		
		
		
		//construct the JSON object to send
		email = form.email.value;
		password = form.password.value;
		password2 = form.password2.value;
		firstname = form.firstname.value;
		familyname = form.familyname.value;
		gender = form.gender.value;
		city = form.city.value;
		country = form.country.value;
		
		args = ("email="+email+"&password="+password+"&password2="+password2+"&firstname="+firstname+"&familyname="+familyname+"&gender="+gender+"&city="+city+"&country="+country).trim();

		//send JSON signup request to server
		//replace with xmlhtml
		
		sendPostRequest("signUp","http://localhost:5000/sign_up",args);
		
		return false;
	}
	
	
	else {
		console.log("passwords or gender incorrect, not sent to server!");
		return false;
	}
}

//loops through all the fields of the form and make sure that they
// aren't empty.
function validate(form) {

	//should return a list of inputfields
	inputs = form.getElementsByTagName('input');
	
	//for every field, check if it is empty
	isFilled = true;
	for ( i=0; i<inputs.length-1; ++i) {		
		if (inputs[i].value == "" || inputs[i].value == null) {
			isFilled = false;
			redborder(inputs[i]);
		}
	} 
	
	return isFilled;
	
}

function compare_pwd(form)	{
	pwd1 = form.password.value;
	pwd2 = form.password2.value;
	
	if (pwd1===pwd2){
		return true;
	}
	else{
		form.password.style.border="2px solid red";
		form.password.value="";
		form.password2.style.border="2px solid red";
		form.password2.value="";
		return false;
	}	
}

//give a textbox a red border to indicate bad input
function redborder(textbox){
	textbox.style.border="2px solid red";
}

//resets a field to its black border
function blackborder(textbox){
	textbox.style.border="1px solid black";
}

//resets the loginform
//called when user changes value of any field in the loginform
function resetLogin() {
	
	form = document.getElementById('loginform');
	
	blackborder(form.password);
	blackborder(form.password);
	document.getElementById('message1').innerHTML = "";
	
}

function presentDiv(showThisDiv, showThisTab) { 
    //Hides all divs and all highlights
    homepagediv.className="hidden";
    browsepagediv.className="hidden";
    accountpagediv.className="hidden";    
    home.style.color="#b2b2b2";
    browse.style.color="#b2b2b2";
    account.style.color="#b2b2b2";
        
    //Shows called tag and highlights its tabname 
    showThisDiv.className="unhidden";
    showThisTab.style.color="black";
  }