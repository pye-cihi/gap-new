from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
# from data import category, category2, category3, people
import get_data

app = Flask(__name__)
CORS(app)
app.config['PROPAGATE_EXCEPTIONS'] = True # To allow flask propagating exception even if debug is set to false on app
app.secret_key = 'jose'
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('supervisor',
    type=str,
    required=True,
    help="This field cannot be blank."
)


## These class definitions should be moved to other python files

class UserList(Resource):
    def get(self):
        return {'users': get_data.get_people()}

class Graph(Resource):
    def get(self):
        return {'gdata': get_data.get_graph()}
        
class Survey(Resource):
    
    def get(self, eid, ifneed, supervisee_id):
        
        print("do we get data from angular GET?")
        print("employee id = " + str(eid), 
              "\nif user is entering need score = " + str(ifneed), 
              "\nsupervisee id = " + str(supervisee_id))
        
        return {'items': get_data.get_skills_and_existing_scores(eid, ifneed, supervisee_id)}
    
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
        get_data.update_scores(eid, ifneed, supervisee_id, request_data)
        return {'data submitted': request_data}


api.add_resource(UserList, '/users')
api.add_resource(Survey, '/items/<int:eid>/<int:ifneed>/<int:supervisee_id>')

if __name__ == '__main__':
    app.run(debug=True)  # important to mention debug=True
