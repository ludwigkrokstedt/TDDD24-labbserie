# the server module provides the capability to save, get and remove phone contacts using database_helper module.
import base64
from flask import Flask,session, render_template, request, redirect, flash
import database_helper, random
#more required imports

app = Flask(__name__)
app.config['DEBUG'] = True

SECRET_KEY = 'verysecretkey!23X'

@app.route('/')
def hello_world():
    if 'token' in session:
        return render_template('hello.html', token = session['token'])
    return render_template('hello.html', message="")


## OTESTAD FUNKTION
@app.route('/post_message', methods=['POST'])
def post_message():
    if 'token' in session:

        token = session['token']
        recipient = request.form['recipient']
        message = request.form['message']

        result = database_helper.post_message(app, recipient, database_helper.token_to_email(app,token), message)

        return result["message"]

    else:
        return "NO TOKEN IN SESSION"
@app.route('/get_user_data_by_token', methods=['POST'])
def get_user_data_by_token():
    if 'token' in session:
        token = request.form['token']
        email = database_helper.token_to_email(app, token)

        result = database_helper.get_user_data_by_email(app,email)
        return result["data"]

    else:
        return "NO TOKEN IN SESSION"

@app.route('/get_user_data_by_email', methods=['POST'])
def get_user_data_by_email():
    if 'token' in session:
        token = session['token']
        email = request.form['email']

        result = database_helper.check_logged_in_user(app, token)

        if result['success']:

            u_data=database_helper.get_user_data_by_email(app,email)

            if u_data['success']:
                return u_data["data"]
            else:
                return "Error fetching user data"

        else:
            return "Error:"+result['data']

    else:
        return "ERROR - NO TOKEN IN SESSION (origin: get_user_data_by_email)"

@app.route('/get_user_messages_by_email', methods=['POST'])
def get_user_messages_by_email():
    if 'token' in session:
        token = session['token']
        email = request.form['email']

        result = database_helper.check_logged_in_user(app,token)

        if result['success']:

            u_messages = database_helper.get_user_messages_by_email(app, email)
            ## NOT SURE WHAT TO DO HERE
            return u_messages["message"]

        else:
            return "ERROR:"+result['data']
    else:
        return "ERROR - NO TOKEN IN SESSION (origin: get_user_messages_by_email)"

@app.route('/signin', methods=['POST', 'GET'])
def signIn():
    error = 'ERROR LOGGING IN'
    if request.method == 'POST':

        #ENCODE AND COMPARE CREDENTIALS WITH DATABASE
        email = request.form['email']
        password = encode(SECRET_KEY, request.form['password'])

        cred_result = database_helper.check_user_credentials(app,email,password)
        if (cred_result["success"]):
            #GENERATE RANDOM TOKEN FOR USER
            #TELL DATABASE THAT USER HAS LOGGED IN
            letters = "abcdefghiklmnopqrstuvwwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
            token = ""
            not_updated = True

            while not_updated:
                for i in range(0,36):
                    token += letters[random.randint(0,61)]

                result = database_helper.log_in_user(app, email, token)

                if result['success']:
                    not_updated = False

            session['token']=token
            return redirect('/')

        else:
            error = cred_result["message"]

    return error

@app.route('/logout')
def logout():

    if (database_helper.test_log_out_user(app, session['token'])['success']):
        session.pop('token', None)
        return redirect('/')
    else:
        return "error while logging out - couldn't pop token from session"

@app.route('/sign_up', methods=['POST'])
def new_user():

    ## check password match
    if request.form['password'] == request.form['password2']:
        ##passwords match
         ## Hash password
        password = request.form['password']
        hp = encode(SECRET_KEY, password)

        ## Send data to the databasehandler to put in database
        ## email password firstname familyname gender city country
        email = request.form['email']
        password = hp
        firstname = request.form['firstname']
        familyname = request.form['familyname']
        gender = request.form['gender']
        city = request.form['city']
        country = request.form['country']

        result = database_helper.sign_up(app, email, hp,firstname,familyname,gender,city,country)

        ## Do different depending on result
        if result['success']:
            return render_template('hello.html', message = result['message'])
        else:
            return result['message']

    else:
        ##passwords doesn't match
        return render_template('hello.html', message = "Passwords doesn't match")


@app.teardown_appcontext
def teardown_app(exception):
    return ("byebye")

@app.route('/init')
def init():
    database_helper.init_db(app);
    return render_template('hello.html',message = "database initiated")

def encode(key, clear):
    enc = []
    for i in range(len(clear)):
        key_c = key[i % len(key)]
        enc_c = chr((ord(clear[i]) + ord(key_c)) % 256)
        enc.append(enc_c)
    return base64.urlsafe_b64encode("".join(enc))

def decode(key, enc):
    dec = []
    enc = base64.urlsafe_b64decode(enc)
    for i in range(len(enc)):
        key_c = key[i % len(key)]
        dec_c = chr((256 + ord(enc[i]) - ord(key_c)) % 256)
        dec.append(dec_c)
    return "".join(dec)

@app.route('/ludde')
def ludde():

    ## check logged in user
    message1 = database_helper.check_logged_in_user(app, "12345")
    message2 = database_helper.check_logged_in_user(app, "1111")

    ## check user credentials
    email = "test@user"
    password = "asd"
    message3 = database_helper.check_user_credentials(app, email, password)

    ## hash password
    message4 = encode(SECRET_KEY, "a")

    return "w_loggedinuser: " + str(message1["success"]) + " nw_loggedinuser: " + str(message2["success"]) + "u_credentials: " + message3["message"] + "encoded a: " + message4

if __name__ == '__main__':
    #Secret key must be set to use sessions
    app.secret_key = SECRET_KEY
    app.run()

