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
	console.log("loading welcome view...");
	document.getElementById('content').innerHTML=(document.getElementById('welcomeview').innerHTML);
}

function showProfileView() {
	console.log("loading profile view...");
	document.getElementById('content').innerHTML=(document.getElementById('profileview').innerHTML);
	updateHomeWall();
	updateUserInfo();
}

function sendPostRequest(url,params) {

var http = new XMLHttpRequest();
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//http.setRequestHeader("Content-length", params.length);
//http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
		return http.responseText;
    }
	else if(http.readyState == 4 && http.status == 404) {
		console.log("404: page not found");
	}
}

http.send(params);
// state changes!	

}

function findUser(form) {
	
	email = form.email.value;
	//replace with xmlhtml
	res = sendPostRequest("http://localhost/get_user_data_by_email","token="+localStorage.token"&email="+email);
	
	console.log(res.data);
	console.log(res.success);
	
	result = serverstub.getUserMessagesByEmail(localStorage.token, email);
	
	
	if (result.success) {
		localStorage.browse = email;
		updateBrowseWall();
		updateBrowseInfo();
	}
	else {
		console.log(result.message);
	}
	
	
	
	return false;
}

//sends message to own wall (for now)
function sendMessage(form) {
	
	//have to select the email
	//replace with xmlhtml
	uemail = serverstub.getUserDataByToken(localStorage.token).data.email;
	
	//post message
	//replace with xmlhtml
	result = serverstub.postMessage(localStorage.token,form.message.value,uemail);
	
	if (result.success) {
		form.message.value="";
	}
	console.log(result.message);
	updateHomeWall();
	return false;
}

//present/update the user's static info
function updateUserInfo() {
	
	//replace with xmlhtml
	result = serverstub.getUserDataByToken(localStorage.token).data;
	
	html = "";
	
	html += " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Name: </td> <td> Gender: </td>  <td> City: </td> </tr> <tr> <td>" + result.email + "</td> <td>" + result.firstname + " " + result.familyname + "</td> <td>" + result.gender + "</td> <td>" + result.city + "</td> </tr> </table>"
	
	
	document.getElementById('userinfo').innerHTML=html;
	
	
}

//updates the user's home wall
function updateHomeWall() {

	//replace with xmlhtml
	result = serverstub.getUserMessagesByToken(localStorage.token);
	
	document.getElementById('messageboard').innerHTML="";
	
	html = "";
	
	for ( i=0; i<result.data.length; i++) {		
	
		html+= " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Message: </td> </tr> <tr> <td>" + result.data[i].writer + "</td> <td>" + result.data[i].content + "</td> </tr> </table>";
	
	}
	
	document.getElementById('messageboard').innerHTML=html;
}

function updateBrowseWall() {

	if (localStorage.browse != null) {
		
		//replace with xmlhtml
		result = serverstub.getUserMessagesByEmail(localStorage.token,localStorage.browse)
		
		if (result.success) {
		
			document.getElementById('browseboard').innerHTML="";
			html = "";
			for ( i=0; i<result.data.length; i++) {		
			
				html+= " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Message: </td> </tr> <tr> <td>" + result.data[i].writer + "</td> <td>" + result.data[i].content + "</td> </tr> </table>";
			}
			document.getElementById('browseboard').innerHTML=html;		
		
		}
		
	}
	else {
		console.log("LS.browse is not set during update browse wall");
	}

}

function updateBrowseInfo() {

	//replace with xmlhtml
	result = serverstub.getUserDataByEmail(localStorage.token,localStorage.browse).data;
	
	
	html = "";
	
	html += " <table class='tablemessage' border='1'> <tr> <td> Email: </td> <td> Name: </td> <td> Gender: </td>  <td> City: </td> </tr> <tr> <td>" + result.email + "</td> <td>" + result.firstname + " " + result.familyname + "</td> <td>" + result.gender + "</td> <td>" + result.city + "</td> </tr> </table>"
	
	document.getElementById('browseinfo').innerHTML=html;

}

//sends message to other wall
function sendBrowseMessage(form) {
	
	//post message
	//replace with xmlhtml
	result = serverstub.postMessage(localStorage.token,form.message.value,localStorage.browse);
	
	if (result.success) {
		form.message.value="";
	}
	console.log(result.message);
	updateBrowseWall();
	return false;
}

function isLoggedIn() {

	//return true;
	if (localStorage.token) {
		return true;
	}
	else {
	return false; 
	}
}

function logOut() {
	localStorage.removeItem("token");
	location.reload();
}

function validateSignIn(form) {
	if (validate(form)) {
		
		//replace with xmlhtml
		result = serverstub.signIn(form.email.value,form.password.value);
		//set the message1-span to display error message
		console.log(result['success']);
		document.getElementById('message1').innerHTML = result['message'];
		
		console.log("sign in request sent to server!");
		
		//store token locally if success..
		if (result['success']) {
			localStorage.token=result['data']
			//return false;
		}
		else {
			redborder(form.email);
			redborder(form.password);
			return false;
		}
		//return false;
	}
	else {
		return false;
	}
}

function validateSignUp(form) {
	
	if (validate(form) && compare_pwd(form)) {
		

		//construct the JSON object to send
		formResult = {};
		formResult.email = form.email.value;
		formResult.password = form.password.value;
		formResult.firstname = form.firstname.value;
		formResult.familyname = form.familyname.value;
		formResult.gender = form.gender.value;
		formResult.city = form.city.value;
		formResult.country = form.country.value;
		
		//send JSON signup request to server
		//replace with xmlhtml
		result = serverstub.signUp(formResult);
		
		//set the message2-span to display error message
		document.getElementById('message2').innerHTML = result['message'];
		
		if (result['success']) {
			return false;
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
			
			return false;
		}

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
		console.log("Password correct");
		return true;
	}
	else{
		console.log("Password wrong");
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