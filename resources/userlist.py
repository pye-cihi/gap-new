from flask_restful import Resource
from models.userlist import UserListModel

class UserList(Resource):
    def get(self):
        return {'users': UserListModel.get_people()}