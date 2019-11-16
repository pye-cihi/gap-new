import mysql.connector
from mysql.connector import Error

host='52.60.98.175'
database='ITS_SKILLS_AX' 
user='yeraj'
password='madskills!'

class UserListModel():

    def __init__(self):
        pass

    @classmethod
    def get_people(cls):
        Query_Get_ALL = "SELECT EMPLOYEE_ID, EMPLOYEE_NAME, EMPLOYEE_ROLE_ID, SUPERVISOR_ID, SUPERVISOR_NAME, SUPERVISOR_ROLE_ID from v_EMPLOYEE_ALL"
        
        connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
        cur = connection.cursor()
        cur.execute(Query_Get_ALL)
        result = cur.fetchall()  # result contains every one, and his/her supervisor

        result_Dictionary = {}
        # put everone into the result_Dictionary
        for row in result:
            result_Dictionary[row[0]] = {
                'eid': row[0],
                'name': row[1],
                'rid': row[2],
                'supervisee': []
            }
        
        # put every supervisee into their supervisor's supervisee list
        for row in result:
            if row[3] is not None: # SUPERVISOR_ID is not null
                result_Dictionary[row[3]]['supervisee'].append({'eid': row[0], 'name': row[1], 'rid': row[2]})

        return list(result_Dictionary.values()) # list of supervisors who have supervisees