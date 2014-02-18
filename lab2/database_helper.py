# the database_helper module provides low level database operations used by the server module.
# the database_helper module relies on sqlite3 as DBMS. the information is written in database.db.

#required imports
import sqlite3
from flask import g


def connect_db():
    return sqlite3.connect("database.db")

def close_db():
    get_db().close()


def get_db(): 
    db = getattr(g,'db',None)
    if db is None:
        db = g.db = connect_db()
    return db

def add_contact(firstname, familyname, phonenumber):
    print "get_db"

def get_contact(firstname, familyname):
    print "get_db"

def remove_contact(firstname, familyname):
    print "get_db"

def signIn():
    print "loggar in...."
# Note: the implementation of the functions has been removed on purpose.
