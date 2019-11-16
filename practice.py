import mysql.connector
from mysql.connector import Error
# from db import db

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

host='52.60.98.175'
database='ITS_SKILLS_AX' 
user='yeraj'
password='madskills!'






class UserListModel():
    __tablename__ = 'v_EMPLOYEE_ALL'

    EMPLOYEE_ID = db.Column(db.Integer)
    EMPLOYEE_NAME = db.Column(db.String(121))
    EMPLOYEE_ROLE_ID = db.Column(db.Integer)
    SUPERVISOR_ID = db.Column(db.Integer)

    def __init__(self):
        pass

    @classmethod
    def get_people(cls):

        result = cls.query.all()  # result contains every one, and his/her supervisor

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