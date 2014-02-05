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
}

function sendMessage(form) {
	console.log(form.message.value);
	return true;
}

function isLoggedIn() {
<<<<<<< HEAD

=======
>>>>>>> 68b2ece0a81a82bf1704fd7f09faa8ccef8a3972
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
		
		result = serverstub.signIn(form.email.value,form.password.value);
		//set the message1-span to display error message
		console.log(result['success']);
		document.getElementById('message1').innerHTML = result['message'];
		
		console.log("sign in request sent to server!");
		
		//store token locally if success..
		if (result['success']) {
			localStorage.token=result['data']
			return true;
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
		result = serverstub.signUp(formResult);
		
		//set the message2-span to display error message
		document.getElementById('message2').innerHTML = result['message'];
		
		if (result['success']) {
			return true;
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