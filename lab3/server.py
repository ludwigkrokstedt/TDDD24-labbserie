# the server module provides the capability to save, get and remove phone contacts using database_helper module.
import base64
from flask import Flask,session, render_template, request, redirect, flash,jsonify
import database_helper, random
#more required imports

app = Flask(__name__)
app.config['DEBUG'] = True

SECRET_KEY = 'verysecretkey!23X'

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if 'token' in session:
        return render_template('client.html')

    session['token'] = '12345' #set the token to test user - REMOVE LATER

    return render_template('client.html')

##OLD ROUTE FOR DEMONSTRATING LAB 2
@app.route('/demonstration')
def demonstration():
    if 'token' in session:
        return render_template('secret_hideout.html', token = session['token'])
    return render_template('secret_hideout.html', message="")

@app.route('/post_message', methods=['POST'])
def post_message():
    if 'token' in session:

        #DATABASE check if token is logged in
        result = database_helper.check_logged_in_user(app, session['token'])
        if result['success']:


            token = session['token']
            recipient = request.form['recipient']

            ## if 36 chars, assuming token inserted.
            if len(recipient) == 36:
                recipient = database_helper.token_to_email(app,recipient)

            message = request.form['message']

            result = database_helper.post_message(app, recipient, database_helper.token_to_email(app,token), message)

            return result

    else:
        return {"success": False, "message": "NO TOKEN IN SESSION"}
@app.route('/get_user_data_by_token', methods=['POST'])
def get_user_data_by_token():
    if 'token' in session:
        token = request.form['token']
        email = database_helper.token_to_email(app, token)

        result = database_helper.get_user_data_by_email(app,email)
        return result

    else:
        return {"success":False,"data":"There was no token in session"}

@app.route('/get_user_data_by_email', methods=['POST'])
def get_user_data_by_email():
    if 'token' in session:
        token = session['token']
        email = request.form['email']

        #DATABASE check if token is logged in
        #DATABASE get user data from email
        result = database_helper.check_logged_in_user(app, token)

        if result['success']:

            u_data=database_helper.get_user_data_by_email(app,email)

            if u_data['success']:
                return jsonify(u_data)
            else:
                return jsonify(u_data)

        else:
            return jsonify(result)

    else:
        return jsonify({"success": False, "data" : "No token in session"})

@app.route('/get_user_messages_by_email', methods=['POST'])
def get_user_messages_by_email():
    if 'token' in session:
        token = session['token']
        email = request.form['email']

        result = database_helper.check_logged_in_user(app,token)

        if result['success']:

            if len(email) == 36:
                email = database_helper.token_to_email(app,email)

            u_messages = database_helper.get_user_messages_by_email(app, email)
            return jsonify(u_messages)

        else:
            return jsonify(result)
    else:
        return jsonify({"success": False, "message": "ERROR - NO TOKEN IN SESSION (origin: get_user_messages_by_email)"})

@app.route('/get_user_messages_by_token', methods=['POST'])
def get_user_messages_by_token():
    if 'token' in session:

        token = request.form['token']

        email = database_helper.token_to_email(app,token)
        u_messages = database_helper.get_user_messages_by_email(app, email)

        return u_messages

    else:
        return {"success": False, "message":"NO TOKEN IN SESSION"}


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
            return jsonify(result)

        else:
           return jsonify(cred_result)

    return jsonify({"success": False, "message": "GET METHOD NOT ALLOWED LOGGING IN"})

@app.route('/logout')
def logout():

    result = database_helper.log_out_user(app, session['token'])

    if (result['success']):
        session.pop('token', None)

    return result


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
        return result

    else:
        ##passwords doesn't match
        return {"success":False,"message":"Passwords doesn't match"}


@app.teardown_appcontext
def teardown_app(exception):
    return ("byebye")

@app.route('/init')
def init():
    database_helper.init_db(app);
    return jsonify({"success": True, "message": "Database initiated"})

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

@app.route('/change_password', methods=['POST'])
def change_password():

    if 'token' in session:
        error = 'ERROR CHANGING PASSWORD'
        token = session['token']
        old_pwd = encode(SECRET_KEY, request.form['oldpwd'])
        email = database_helper.token_to_email(app, token)

        if database_helper.check_user_credentials(app, email, old_pwd)['success']:
            new_pwd = encode(SECRET_KEY, request.form['newpwd'])
            database_helper.change_user_pwd(app, email, new_pwd)
            return {"success": True, "message": "Password changed!"}
        else:
            return {"success": False, "message":"old_pwd not in DB"}



if __name__ == '__main__':
    #Secret key must be set to use sessions
    app.secret_key = SECRET_KEY
    app.run()

