__author__ = 'fredrikwendelstrom'

import database_helper
import sqlite3
import base64
from flask import Flask,session, render_template, request, redirect, flash

app = Flask(__name__)
app.config['DEBUG'] = True

def createTable():
    queryCurs.execute('''CREATE TABLE customers
    (id INTEGER PRIMARY KEY, name TEXT, street TEXT, city TEXT, state TEXT, balance REAL)''')

def addCust(name,street,city,state, balance):
    queryCurs.execute('''INSERT INTO customers (name,street,city,state, balance)
    VALUES (?,?,?,?,?)''',(name,street,city,state, balance))

@app.route('/fredrik2')
def main():
    print "Main in fredrikTest"
    #print(database_helper.sign_up("myepost","mittpasswd","fredrik","wendelstrom","man","lkpg","sweden"))


    #createDb = sqlite3.connect('testdb.db')
    #queryCurs = createDb.cursor()

    #createTable()

    #addCust('Fredrik','Vallagatan','Lkpg','Ostergotaland','123.45')

    #createDb.commit()

    #queryCurs.execute('SELECT * FROM customers')

    #listTitle = ['Id Num','Name','Street','City','State','Balance']
    # print listTitle[1]
    #print queryCurs[1]
    #queryCurs.close()

main()


#if __name__ == '__main__':

#print(database_helper.testfunction())

#print("beginning test2")

#result = database_helper.add_contact("ludde", "0739077752")
#print(result)