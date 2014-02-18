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
from flask import Flask
import database_helper
#more required imports

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def hello_world():

    return 'Welcome to phonebook'


@app.route('/signin')
def signIn():
    print('pissprogram som inte fungerar')

@app.route('/getcontact')
def get_contact():
    print("foo")

@app.route('/removecontact')
def remove_contact():
    print("foo")


@app.teardown_appcontext
def teardown_app(exception):
    print("byebye")

if __name__ == '__main__':
    app.run()

# Note: the implementation of the functions has been removed on purpose.
