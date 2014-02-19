'''
Lesson 2,
Subject: server-side programming
Date and time: Wednesday 5th of February 2014. 10:15-12 am.
Location: VAL Seminar room, Campus Valla.
Author: Sahand Sadjadee

Revised version.
'''

# the server module provides the capability to save, get and remove phone contacts using database_helper module.
import hashlib
from flask import Flask,session, render_template, request, redirect
import database_helper
#more required imports

app = Flask(__name__)
app.config['DEBUG'] = True

#DEVELOPMENT VARIABLES
USERNAME = "a"
PASSWORD = "b"

@app.route('/')
def hello_world():
    if 'logged_in' in session:
        return render_template('secret_hideout.html')
    return render_template('hello.html')

@app.route('/signin', methods=['POST', 'GET'])
def signIn():
    error = 'ERROR LOGGING IN'
    if request.method == 'POST':
        if request.form['email'] != USERNAME:
            error = 'Invalid username'
        elif request.form['password'] != PASSWORD:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            return redirect('/')
    return error


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
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
    app.secret_key = 'verysecretkey123'
    app.run()

# Note: the implementation of the functions has been removed on purpose.
