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


function validateSignIn(form) {
	if (validate(form)) {
		console.log(form.username.value);
		//serverstub.signIn(form.getElementById('username').value,form.getElementById('password').value);
		return true;
	}
	return false;
}

/*

dobject ska skickas in i serverstubben. istället för getelement så bör form.username.value etc användas

function validateSignUp(form) {
	if (validate(form) && compare_pwd(pass1,pass2)) {
		
		dobject = [form.getElementById('username').value,
		form.getElementById('password').value,
		form.getElementById('name').value,
		form.getElementById('fname').value,
		form.getElementById('gender').value,
		form.getElementById('username').value,
		form.getElementById('username')]
		
		serverstub.signUp(dobject);
	}
}
*/

//shoud loop through all the fields of the form and make sure that they
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
	
	if (isFilled) {
		
		//all critera is met - call the serverstub function
		console.log("alla fält är fyllda!");
	}
	else {
		console.log("minst ett fält är ofyllt!");
	}
	
	return isFilled;
	
}