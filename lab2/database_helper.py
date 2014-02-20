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

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_db()
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

def add_contact():
    print "get_db"

    return "om det gar bra - successs"

def get_contact():
    print "get_db"

def remove_contact():
    print "get_db"

def signIn():
    print "loggar in...."
# Note: the implementation of the functions has been removed on purpose.

def testfunction():
    return "Hejhej"


