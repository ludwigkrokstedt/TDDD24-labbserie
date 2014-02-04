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
	
function isLoggedIn() {
	//unimplemented
	return false; 
}

function validateSignIn(form) {
	if (validate(form)) {
		
		result = serverstub.signIn(form.email.value,form.password.value);
		//set the message1-span to display error message
		console.log(result['message']);
		document.getElementById('message1').innerHTML = result['message'];
		
		console.log("sign in request sent to server!");
		
		//should return the console.log['success'] - ask about in lab!
		return false;
	}
	else {
		return false;
	}
}

function validateSignUp(form) {
	
	if (validate(form) && compare_pwd(form)) {
		
		//send the signup request to the server
		// creating strange errors - ask about at lab!
		
		//result = serverstub.signUp(form);
		//console.log(result['message']);
		//set the message2-span to display error message
		document.getElementById('message2').innerHTML = 'logged in! - unimplemented';
		//should return the result['success'] instead of true
		return true;
	}
	else
		console.log("passwords or gender incorrect, not sent to server!");
		return false;
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
			redborder(i);
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
function redborder(i){
	inputs[i].style.border="2px solid red";
}

//resets a field to its black border
function blackborder(textbox){
	textbox.style.border="1px solid black";
}

function presentDiv(showThisDiv, showThisTab) { 
    //Hides all divs and all highlights
    homepagediv.className="hidden";
    browsepagediv.className="hidden";
    accountpagediv.className="hidden";    
    home.style.color="#b2b2b2";
    browse.style.color="#b2b2b2";
    account.style.color="#b2b2b2";
    
    //tabmenu.style.color="#b2b2b2";

    //Shows called tag and highlights its tabname 
    showThisDiv.className="unhidden";
    showThisTab.style.color="black";
  }