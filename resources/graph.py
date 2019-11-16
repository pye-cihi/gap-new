from flask_restful import Resource
from models.graph import GraphModel

class Graph(Resource):
    def get(self):
        return {'gdata': GraphModel.get_graph()}


