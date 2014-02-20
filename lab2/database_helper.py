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

def connect_db(app):
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

# Initiates database when called (drops all tables and creates again)
# Called form server.py
def init_db(app):
    with app.app_context():
        db = get_db()
        with app.open_resource('database.schema', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def get_db(app):
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_db(app)
    return db

def sign_up(email,password,firstname,familyname,gender,city,country):

    queryCurs = connect_db().cursor()

    queryCurs.execute('SELECT email FROM users')

    return queryCurs
    #for i in queryCurs:
    #    print "\n"


    #plocka in parameter user
    #read databasen
    #loopa our parameter user mot alla i databasen, if exist, return user alreay exists
    #if not found, skriv in skickad user i databasen och return success
def test_sign_up(email, password,firstname,familyname,gender,city,country):
    return {"success": True, "message": "successfully created new user!"}

def add_contact(app):
    print "get_db"
    return "om det gar bra - successs"

def signIn(app):
    print "loggar in...."
# Note: the implementation of the functions has been removed on purpose.

def testfunction():
    return "Hejhej"


