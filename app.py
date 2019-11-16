from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
# from data import category, category2, category3, people
import get_data

from resources.userlist import UserList
from resources.survey import Survey
from resources.graph import Graph

app = Flask(__name__)
CORS(app)


app.config.from_object('config')  # configration info in config.py
api = Api(app)

# @app.before_first_request
# def create_tables():
#     db.create_all()  # create the tables used by alchemy if not exists

api.add_resource(UserList, '/users')
api.add_resource(Survey, '/items/<int:eid>/<int:ifneed>/<int:supervisee_id>')
api.add_resource(Graph, '/graph')

if __name__ == '__main__':

    # cicular import so other modules can use db
    from db import db
    db.init_app(app)


    app.run(debug=True)  # important to mention debug=True
