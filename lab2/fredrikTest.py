__author__ = 'fredrikwendelstrom'

import database_helper
import sqlite3


def createTable():
    queryCurs.execute('''CREATE TABLE customers
    (id INTEGER PRIMARY KEY, name TEXT, street TEXT, city TEXT, state TEXT, balance REAL)''')

def addCust(name,street,city,state, balance):
    queryCurs.execute('''INSERT INTO customers (name,street,city,state, balance)
    VALUES (?,?,?,?,?)''',(name,street,city,state, balance))

def main():
    createDb = sqlite3.connect('testdb.db')
    queryCurs = createDb.cursor()

    createTable()

    addCust('Fredrik','Vallagatan','Lkpg','Ostergotaland','123.45')

    createDb.commit()

    queryCurs.execute('SELECT * FROM customers')

    listTitle = ['Id Num','Name','Street','City','State','Balance']
    # print listTitle[1]
    #print queryCurs[1]
    queryCurs.close()



#if __name__ == '__main__': main()


#print(database_helper.testfunction())
print(database_helper.sign_up('myepost','mittpasswd','fredrik','wendelstrom','man','lkpg','sweden'))

#print("beginning test2")

#result = database_helper.add_contact("ludde", "0739077752")
#print(result)