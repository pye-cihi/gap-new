import mysql.connector
from mysql.connector import Error
# from data import category

#pp.config['MYSQL_DATABASE_HOST'] = 'http://35.183.87.173/phpMyAdmin'
#app.config['MYSQL_DATABASE_USER'] = 'yeraj'
#app.config['MYSQL_DATABASE_PASSWORD'] = 'madskills!'
#app.config['MYSQL_DATABASE_DB'] = 'Skills_Assessment_DB'

# host='localhost'
# database='Skills_Assessment_DB'
# user='yeraj'
# password='madskills!'
host='52.60.98.175'
database='ITS_SKILLS_AX'
user='yeraj'
password='madskills!'


def get_people():
    leadership_threshold = 3

    """ Connect to MySQL database """
    connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
    
    if connection.is_connected():
        print('Connected to MySQL database') #WORKED

    Query_Get_LEADERS = "SELECT EMPLOYEE_ID, EMPLOYEE_NAME, EMPLOYEE_ROLE_ID, SUPERVISOR_ID, SUPERVISOR_NAME, SUPERVISOR_ROLE_ID from v_EMPLOYEE_LEADERS"
    Query_Get_ALL = "SELECT EMPLOYEE_ID, EMPLOYEE_NAME, EMPLOYEE_ROLE_ID, SUPERVISOR_ID, SUPERVISOR_NAME, SUPERVISOR_ROLE_ID from v_EMPLOYEE_ALL"

    # Get the supervisors and their supervisees
    cur = connection.cursor()
    cur.execute(Query_Get_LEADERS)
    result = cur.fetchall() # the result is a List of Tuples
    supervisors = []
    for row in result:
        supervisors.append({'eid': row[0], 'name': row[1], 'rid': row[2]})  # Get the supervisors and store their information

    cur.execute(Query_Get_ALL)
    result = cur.fetchall()  # result contains every one, and his/her supervisor

    dic = dict((
        i['eid'],
        {'eid': i['eid'], 
        'name': i['name'], 
        'rid': i['rid'], 
        'supervisee': []}) for i in supervisors)

    for row in result: # loop through every one
        if row[3]: # supervisor is not None
            dic[row[3]]['supervisee'].append({'eid': row[0], 'name': row[1], 'rid': row[2]}) 
    people = list(dic.values()) # list of supervisors who have supervisees

    # loop through the grassroots
    for row in result:
        if int(row[2]) < leadership_threshold:
            people.append({'eid': row[0], 'name': row[1], 'rid': row[2], 'supervisee': None}) 
    
    connection.close()
    
    return people # this is a list of dictionary


# this function will GET the skills and exsiting scores from the database, if no previous scores, set 0 as score
def get_skills_and_existing_scores(eid, ifneed, supervisee_id):
    if ifneed == 0: # skill table
        return get_employee_skill_score(eid) 
    else: # need table
        return get_supervisor_skill_need_score(eid, supervisee_id) 


# # this function will PUT/UPDATE the skills and the updated scores to the database
def update_scores(eid, ifneed, supervisee_id, skills_scores):  # skills_scores is a list of Dic: same as Category in the exmaple data
    skills = []
    skills_revert = []
    for cat in skills_scores:
        for skill in cat['skill']:
            skills.append((skill['skillid'],skill['score']))
            skills_revert.append((skill['score'],skill['skillid']))
    # skills = [(1, 0), (2, 1), (3, 2), (4, 3), (5, 0), (6, 4), (7, 5), (8, 4), (9, 5)]
    
    if ifneed == 0: # Post to Skill Table
        """ Connect to MySQL database """
        connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
        query = "replace into EMPLOYEE_SKILL_SCORE values ({}, %s, %s)".format(eid)
        cur = connection.cursor()
        cur.executemany(query, skills)
        connection.commit() 
        connection.close()

    else: #Post to Need Table
        connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
        query = "replace into SUPERVISOR_SKILL_NEED_SCORE values ({}, %s, {}, %s)".format(eid, supervisee_id)
        cur = connection.cursor()
        cur.executemany(query, skills) 
        connection.commit()
        connection.close()
        
    # when Anna Moreira enter need for BAS Team Lead, the "BAS Team Lead" automatic enter need for its team
    if supervisee_id == 73 and eid == 2:  #EMPLOYEE_ID_BSA_TEAM_LEAD = 73 in database table EMPLOYEE
        update_scores(73, 1, 0, skills_scores)


def get_employee_skill_score(e_id):
    connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
    cur = connection.cursor()
    cur.callproc('sp_get_employee_skill_score', [e_id, ])
    for i in cur.stored_results():
        result = i.fetchall()
    dic = empty_categories() 
    for row in result:
        dic[row[3]]['skill'].append({'skillid': row[0], 'skillname': row[1], 'score': row[5], 'desc': row[2]})
    connection.close()
    return list(dic.values()) # return the scores, default 0 if not exist, result is a list of dic [{},{}]


def get_supervisor_skill_need_score(s_id, e_id):
    connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
    cur = connection.cursor()
    cur.callproc('sp_get_supervisor_skill_need_score', [s_id, e_id, ])
    for i in cur.stored_results():
        result = i.fetchall()
    dic = empty_categories() 
    for row in result:
        dic[row[3]]['skill'].append({'skillid': row[0], 'skillname': row[1], 'score': row[5], 'desc': row[2]})
    connection.close()
    return list(dic.values()) # return the scores, default 0 if not exist, result is a list of dic [{},{}]


def empty_categories():
    connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
    query = "SELECT * FROM SKILL_CATEGORY;"
    cur = connection.cursor()
    cur.execute(query)
    result = cur.fetchall() # the result is a List of Tuples
    dic = dict((
        row[0],
        {'catid': row[0], 
        'catname': row[1], 
        'skill': []}) for row in result)
    connection.close()
    return dic


# this function will GET the data for visualization
def get_graph():
    """ Connect to MySQL database """
    connection = mysql.connector.connect(host=host, database=database, user=user, password=password)
    
    if connection.is_connected():
        print('Connected to MySQL database') #WORKED

    Query_Get_ALL = "SELECT * FROM v_NEED_SKILL_SCORES ORDER BY SKILL_NAME ASC" #6 cols - skillid, skill_cat_desc, skill_name, have, need, job_role_id

    # Get the supervisors and their supervisees
    cur = connection.cursor()
    cur.execute(Query_Get_ALL)
    result = cur.fetchall() # the result is a List of Tuples
    branch_dic = []
    for row in result:
        branch_dic.append({'id': int(row[0]), 'category': row[1], 'name': row[2], 'have': int(row[3]), 'need': int(row[4]), 'job_role':int(row[5])})
        

    connection.close()
    
    return branch_dic # this is a list of dictionary

