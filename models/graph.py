import mysql.connector
from mysql.connector import Error

host='52.60.98.175'
database='ITS_SKILLS_AX' 
user='yeraj'
password='madskills!'

class GraphModel():

    def __init__(self):
        pass

    # this function will GET the data for visualization
    @classmethod
    def get_graph(cls):
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