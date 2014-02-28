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

def sign_up(app, email, password, firstname, familyname, gender, city, country):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("INSERT INTO users (id, email, password, firstname, familyname, gender, city, country) VALUES(null, '"+email+"', '"+password+"', '"+firstname+"', '"+familyname+"', '"+gender+"', '"+city+"', '"+country+"')");

        conn.commit()


        return {"success": True, "message": "successfully created new user!"}


#Checks if the token is in the database and returns the email of the user
def check_logged_in_user(app, token):
    with app.app_context():
        #SELECT THE USER
        conn = sqlite3.connect(DATABASE)

        cursor = conn.execute("SELECT * from loggedInUsers where token='"+token+"'")

        result = "no user found"
        success = False

        for row in cursor:
            result = row[1]
            success = True

        conn.commit()

        return {"success": success, "data": result}

def token_to_email(app,token):
    result = check_logged_in_user(app,token)
    return result['data']

def test_check_user_credentials(app, email, password):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)

        cursor = conn.execute("SELECT * from users where email='"+email+"' AND password='"+email+"' ")

        success = False

        for row in cursor:
                db_password = row[2]
                success = True

        if success:
            return (password == db_password)
        else:
            return False

def test_log_in_user(app, email, token):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("INSERT INTO loggedInUsers(email, token) VALUES('"+email+"', '"+token+"')")

        conn.commit()

        return {"success": True, "message": "successfully logged in!"}

def test_log_out_user(app, token):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("DELETE FROM loggedInUsers WHERE token='"+token+"' ")

        conn.commit()

        return {"success": True, "message": "successfully logged out!"}

def add_contact(app):
    print "get_db"
    return "om det gar bra - successs"

def sign_in(app, email, token):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute()

        conn.commit()

        return {"success": True, "message": "successfully logged in!"}
# Note: the implementation of the functions has been removed on purpose.

