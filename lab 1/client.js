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
		serverstub.signIn(form.username.value,form.password.value);
		console.log("sign in request sent to server!");
		return true;
	}
	else {
		return false;
		}
}



function validateSignUp(form) {
	if (validate(form) && compare_pwd(form.password.value,form.password2.value)){
		
		dobject = [form.username.value,
		form.password.value,
		form.name.value,
		form.fname.value,
		document.getElementById('gender').value,
		form.city.value,
		form.country.value]
		
		serverstub.signUp(dobject);
		
		console.log("signup sent to server!");
		
		return true;
	}
	console.log("passwords or gender incorrect, not sent to server!");
	return false;
	
	}


//should loop through all the fields of the form and make sure that they
// aren't empty. Doesn't work yet though.
//
// Unfinished.
function validate(form) {

	//should return a list of inputfields
	inputs = form.getElementsByTagName('input');

	//for every field, check if it is empty
	isFilled = true;
	for ( i=0; i<inputs.length-1; ++i) {		
		if (inputs[i].value == "" || inputs[i].value == null) {
			isFilled = false;
		}
	} 
	
	if ( (inputs.length)> 3 && (document.getElementById('gender').value != "null") ) {
		console.log(document.getElementById('gender').value);
	}
	else if (inputs.length > 3) {
		isFilled=false;
	}
	
	if (isFilled) {
		console.log("alla fält är fyllda!");
	}
	else {
		console.log("minst ett fält är ofyllt!");
		
	}
	return isFilled;
	
}

function compare_pwd(pwd1, pwd2)	{
	if (pwd1===pwd2){
		return true;
	}
	else{
		return false;
	}	
}