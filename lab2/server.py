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
        return render_template('secret_hideout.html', token = session['token'])
    return render_template('hello.html', message="")

@app.route('/get_user_data_by_token', methods=['POST'])
def get_user_data_by_token():
    token = request.form['token']
    email = token_to_email(token)



    #DATABASE - get user data by email

    return "get user data"

@app.route('/get_user_data_by_email', methods=['POST'])
def get_user_data_by_email():
    if 'token' in session:
        token = session['token']
        email = request.form['email']

        #DATABASE check if token is logged in
        #DATABASE get user data from email

        return "email: " + "a" + "name: "+ "w" + " familyname: "+"d"+"gender: "+ "d" + "city: " + "2" +"country: "

    else:
        return "ERROR - NO TOKEN IN SESSION"

@app.route('/get_user_messages_by_email', methods=['POST'])
def get_user_messages_by_email():
    if 'token' in session:
        token = session['token']
        email = request.form['email']

        #DATABASE check if token is logged in
        #DATABASES get user messsages from mail

        return "messages got from database: "


def token_to_email(token):
    #DATABASE
    email = "some@email.com"
    return email

@app.route('/signin', methods=['POST', 'GET'])
def signIn():
    error = 'ERROR LOGGING IN'
    if request.method == 'POST':

        #ENCODE AND COMPARE CREDENTIALS WITH DATABASE
        email = request.form['email']
        password = encode(SECRET_KEY, request.form['password'])

        if (database_helper.test_check_user_credentials(app,email,password)):
            #GENERATE RANDOM TOKEN FOR USER
            #TELL DATABASE THAT USER HAS LOGGED IN
            letters = "abcdefghiklmnopqrstuvwwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
            token = ""
            not_updated = True

            while not_updated:
                for i in range(0,36):
                    token += letters[random.randint(0,61)]

                result = database_helper.test_log_in_user(app, email, token)

                if result['success']:
                    not_updated = False

            session['token']=token
            return redirect('/')

        else:
            error = 'Invalid username or password'

    return error


@app.route('/logout')
def logout():

    if (database_helper.test_log_out_user(app, session['token'])['success']):
        session.pop('token', None)
        return redirect('/')
    else:
        return "error while logging out"

@app.route('/post_message', methods=['POST'])
def post_message():

    message = "ERROR SENDING MESSAGE"
    #result = postMessage(session['token'],request.form['content'],request.form[toEmail)
    result = True
    if result:
        message = "message successful"
    return message

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

    message1 = database_helper.check_logged_in_user(app, "1234")
    return 'Hello World!'
    #return render_template('hello.html', message="Funktionen fredrik kord"+database_helper.sign_up(app,"myepost","mittpasswd","fredrik","wendelstrom","man","lkpg","sweden"))


if __name__ == '__main__':
    #Secret key must be set to use sessions
    app.secret_key = SECRET_KEY
    app.run()

