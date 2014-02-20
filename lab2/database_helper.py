# the database_helper module provides low level database operations used by the server module.
# the database_helper module relies on sqlite3 as DBMS. the information is written in database.db.

#required imports
import sqlite3
from flask import g

DATABASE = 'database.db'

def main():
    sign_up()
    print "main read"

def connect_db():
    return sqlite3.connect(DATABASE)


# Initiates database when called (drops all tables and creates again)
# Called form server.py
def init_db(app):
    with app.app_context():
        db = get_db()
        with app.open_resource('database.schema', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
        db.close()

def get_db():

    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_db()
    return db

def sign_up(app, email,password,firstname,familyname,gender,city,country):
    with app.app_context():
        db = get_db()
    #queryCurs = db.cursor()

    #result = queryCurs.execute('SELECT email FROM users')
    #queryCurs.close()
    #db.commit()
    #db.close()


    return "Some text from signup"

    #plocka in parameter user
    #read databasen
    #loopa our parameter user mot alla i databasen, if exist, return user alreay exists
    #if not found, skriv in skickad user i databasen och return success


def test_sign_up(email, password,firstname,familyname,gender,city,country):
    return {"success": True, "message": "successfully created new user!"}

def test_check_user_credentials(email, password):

    db_email = "a"
    db_password = "6Q==" ##Encoded password "s"

    return (password == db_password)

def test_log_in_user(email,token):

    return {"success": True, "message": "successfully logged in!"}

def test_log_out_user(token):

    return {"success": True, "message": "successfully logged out!"}

def add_contact(app):
    print "get_db"
    return "om det gar bra - successs"

def signIn(app):
    print "loggar in...."
# Note: the implementation of the functions has been removed on purpose.

def testfunction():
    return "Hejhej"

