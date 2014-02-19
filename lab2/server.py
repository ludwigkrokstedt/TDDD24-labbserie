# the server module provides the capability to save, get and remove phone contacts using database_helper module.
import hashlib
from flask import Flask,session, render_template, request, redirect
import database_helper, random
#more required imports

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route('/')
def hello_world():
    if 'token' in session:
        return render_template('secret_hideout.html')
    return render_template('hello.html')

@app.route('/signin', methods=['POST', 'GET'])
def signIn():
    error = 'ERROR LOGGING IN'
    if request.method == 'POST':

        #FETCH EMAIL AND PASSWORD FROM DATABASE
        email = "a"
        password = "b"

        if request.form['email'] != email:
            error = 'Invalid username'
        elif request.form['password'] != password:
            error = 'Invalid password'
        else:
            #GENERATE RANDOM TOKEN FOR USER
            #TELL DATABASE THAT USER HAS LOGGED IN
            letters = "abcdefghiklmnopqrstuvwwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
            token = ""
            not_updated = True

            while not_updated:
                for i in range(0,36):
                    token += letters[random.randint(0,61)]

                # result = addUserLogIn(app, email, token)
                # change True to call the database_handler
                if True:
                    not_updated = False

            session['token']=token

            return redirect('/')
    return error


@app.route('/logout')
def logout():
    session.pop('token', None)
    return redirect('/')

@app.route('/getcontact')
def get_contact():
    return ("foo")

@app.route('/removecontact')
def remove_contact():
    return ("foo")


@app.teardown_appcontext
def teardown_app(exception):
    return ("byebye")

@app.route('/init')
def init():
    database_helper.init_db(app);

if __name__ == '__main__':
    #Secret key must be set to use sessions
    app.secret_key = 'verysecretkey123'
    app.run()

# Note: the implementation of the functions has been removed on purpose.
