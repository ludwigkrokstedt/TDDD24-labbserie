function initiate() {
	console.log("welcome");
	//console.log(document.getElementById('welcomeview').innerHTML);
	if (isLoggedIn()) {
		console.log("you are logged in");
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
	//do like showwelcomeview... no html written yet.
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
	
	console.log("test");
	
	//should return a list of inputfields
	inputs = form.getElementsByTagName('input');
	
	//for every field, check if it is empty
	for ( i=0; i<inputs.lenght; ++index) {
		console.log(i.value);
	}
	
	return false;
	
}