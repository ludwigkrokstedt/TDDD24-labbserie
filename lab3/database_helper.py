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


def get_user_data_by_email(app, email):
    with app.app_context():

        conn = sqlite3.connect(DATABASE)
        cursor = conn.execute("SELECT * from users where email='"+email+"'")
        result = {"success": False, "data": "No user found"}

        for row in cursor:
            result["data"] = row[1]
            result["data"] += "#" + row[2]
            result["data"] += "#" + row[3]
            result["data"] += "#" + row[4]
            result["data"] += "#" + row[5]
            result["data"] += "#" + row[6]
            result["data"] += "#" + row[7]
            result["success"] = True

        conn.commit()

        return result

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

def check_user_credentials(app, email, password):
    with app.app_context():

        conn = sqlite3.connect(DATABASE)
        cursor = conn.execute("SELECT * from users where email='"+email+"' AND password='"+password+"'")

        result = {"success": False, "message": "No such user/password combination"}

        for row in cursor:
                db_password = row[2]
                result["success"] = True

        if result["success"] and (password == db_password):
            result["message"] = "Successfully signed in"
        elif result["success"] and password != db_password:
            result["message": "password invalid"]
            result["success"] = False
        else:
            result["message"] =  "No such user/password"
            result["success"] = False

        return result

def log_in_user(app, email, token):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("INSERT INTO loggedInUsers(email, token) VALUES('"+email+"', '"+token+"')")

        conn.commit()

        return {"success": True, "message": "successfully logged in!", "data": token}

def post_message(app,recipient, writer, content):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("INSERT INTO messages(recipient, writer, content) VALUES('"+recipient+"', '"+writer+"', '"+content+"')")

        conn.commit()

        return {"success": True, "message": "message successfully sent!"}


def get_user_messages_by_email(app, email):

     with app.app_context():
        #SELECT THE USER
        conn = sqlite3.connect(DATABASE)

        cursor = conn.execute("SELECT * from messages where recipient='"+email+"'")

        result = {"success": False, "data": {},"message": "No such user or no messages available"}

        messages = {"writer": "","content": ""}

        #made these rows super stupid since there was something
        # wrong with the dictionary object.

        w = ""
        c = ""

        for row in cursor:
            w += row[2] + "#"
            c += row[3] + "#"
            result["success"] = True
            result["message"] = "Messages retrieved!"

        messages["writer"] = w
        messages["content"] = c

        result["data"] = messages

        conn.commit()

        return result



def log_out_user(app, token):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("DELETE FROM loggedInUsers WHERE token='"+token+"' ")

        conn.commit()

        return {"success": True, "message": "successfully logged out!"}


def sign_in(app, email, token):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute()

        conn.commit()

        return {"success": True, "message": "successfully logged in!"}

def change_user_pwd(app, email, new_password):
    with app.app_context():
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()

        c.execute("UPDATE users SET password='"+new_password+"' WHERE email='"+email+"' ")
        conn.commit()

