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
	return false; // ÄNDRA TBX HÄR VID WELCOME VIEW!!!
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
<<<<<<< HEAD
<<<<<<< HEAD

	console.log("validateSignUp called");
	//pass1 = form.password.value;
	//pass2 = form.password2.value;
	
	 //if (validate(form) && compare_pwd(form.password.value,form.password2.value)) {
	 if (validate(form) && compare_pwd(form)) {
	 //if (validate(form) && compare_pwd(pass1,pass2)) {
// 		dobject = [form.username.value,
// 		form.password.value,
// 		form.name.value,
// 		form.fname.value,
// 		document.getElementById('gender').value,
// 		form.city.value,
// 		form.country.value]
// 		
// 		serverstub.signUp(dobject);
		
		console.log("signup sent to server!");
		
		return true;
	}
	console.log("passwords or gender incorrect, not sent to server!");
	//return true;
	return false;	
=======
	if (validate(form) && compare_pwd(form.password.value,form.password2.value)){
		
=======
	if (validate(form) && compare_pwd(form.password.value,form.password2.value)){
		
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
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
<<<<<<< HEAD
	}
	console.log("passwords or gender incorrect, not sent to server!");
	return false;
	
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
	}


=======
	}
	console.log("passwords or gender incorrect, not sent to server!");
	return false;
	
	}


>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
//should loop through all the fields of the form and make sure that they
// aren't empty. Doesn't work yet though.
//
// Unfinished.
function validate(form) {

	//should return a list of inputfields
	inputs = form.getElementsByTagName('input');
<<<<<<< HEAD
<<<<<<< HEAD
	//console.log(inputs[1].value);
	
	
	// Testskit
	//inputs[1].style.border="1px solid #ff0000";
	//inputs[1].style.outlineColor="#00FF00";
	
	/* //Test of compare pwd function, tested by the login inputs
	if (compare_pwd(form.username.value,form.password.value)){
		console.log("the 2 inputs in login ARE equal");
	}
	else{
		console.log("the 2 lines in login are NOT equal");
	}*/
	
	
=======
=======
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164

>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
	//for every field, check if it is empty
	isFilled = true;
	for ( i=0; i<inputs.length-1; ++i) {		
		if (inputs[i].value == "" || inputs[i].value == null) {
			isFilled = false;
			redborder(i);
		}
	} 
	
<<<<<<< HEAD
<<<<<<< HEAD
	// unnecessary code commented below, remove?
//  if ( (inputs.length)> 3 && (document.getElementById('gender').value != "null") ) {
// 		console.log(document.getElementById('gender').value);
// 	}
// 	else if (inputs.length > 3) {
// 		isFilled=false;
// 	}
=======
=======
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
	if ( (inputs.length)> 3 && (document.getElementById('gender').value != "null") ) {
		console.log(document.getElementById('gender').value);
	}
	else if (inputs.length > 3) {
		isFilled=false;
	}
<<<<<<< HEAD
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
=======
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
	
	if (isFilled) {
		console.log("alla fält är fyllda!");
	}
	else {
		console.log("minst ett fält är ofyllt!");
		
	}
	return isFilled;
	
}

<<<<<<< HEAD
//function compare_pwd(pwd1, pwd2)	{
function compare_pwd(form)	{
	pwd1 = form.password.value;
	pwd2 = form.password2.value;
	
	if (pwd1===pwd2){
		console.log("Password correct");
=======
function compare_pwd(pwd1, pwd2)	{
	if (pwd1===pwd2){
<<<<<<< HEAD
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
=======
>>>>>>> a622d9dd53f675400fda492d1c7cc34e1f958164
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

function redborder(i){
	inputs[i].style.border="2px solid red";
}
function blackborder(textbox){
	console.log("Blackborder called!");
	textbox.style.border="1px solid black";
}

// Testfunkton för anrop från inloggad sida
function hidepage(page){
	getElementsById('page').style.border="1px solid black";
}