# the database_helper module provides low level database operations used by the server module.
# the database_helper module relies on sqlite3 as DBMS. the information is written in database.db.

#required imports
import sqlite3
from flask import g

DATABASE = 'database.db'

def connect_db():
    return sqlite3.connect(DATABASE)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_db()
    return db


def add_contact():
    print "get_db"

def get_contact():
    print "get_db"

def remove_contact():
    print "get_db"

def signIn():
    print "loggar in...."
# Note: the implementation of the functions has been removed on purpose.
