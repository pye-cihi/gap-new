from flask_restful import Resource
from flask import request
import models.survey as SurveyModel

class Survey(Resource):
    
    def get(self, eid, ifneed, supervisee_id):
        
        print("do we get data from angular GET?")
        print("employee id = " + str(eid), 
              "\nif user is entering need score = " + str(ifneed), 
              "\nsupervisee id = " + str(supervisee_id))
        
        return {'items': SurveyModel.get_skills_and_existing_scores(eid, ifneed, supervisee_id)}
    
    def post(self, eid, ifneed, supervisee_id):
            
        # request_data = parser.parse_args()
        # print(request_data)
        request_data = request.get_json()
        print("do we get data from angular? this is a POST")
        print("This is a POST method" + 
              "\nemployee id = " + str(eid), 
              "\nif user is entering need score = " + str(ifneed), 
              "\nsupervisee id = " + str(supervisee_id))        
        import pprint
        pprint.pprint(request_data)
        SurveyModel.update_scores(eid, ifneed, supervisee_id, request_data)
        return {'data submitted': request_data}