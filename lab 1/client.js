function initiate() {
	console.log("welcome");
	//console.log(document.getElementById('welcomeview').innerHTML);
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

//shoud loop through all the fields of the form and make sure that they
// aren't empty. Doesn't work yet though.
//
// Unfinished.
function validate(form) {

	//should return a list of inputfields
	inputs = form.getElementsByTagName('input');
	console.log(inputs[1].value);
	compare_pwd(form.password.value, form.password2.value);

	//for every field, check if it is empty
	isFilled = true;
	for ( i=0; i<inputs.length-1; ++i) {		
		if (inputs[i].value == "" || inputs[i].value == null) {
			isFilled = false;
		}
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
	if (pwd1.equals(pwd2)){
		return true;
	}
	else{
		return false;
	}	
}