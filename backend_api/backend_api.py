from flask import Response, request
from flask_restful import reqparse, abort, Api, Resource

class Day(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('date', type = str, location = 'json')
        self.reqparse.add_argument('data', type = str, location = 'json')
        super(Day, self).__init__()

    def get(self):
        args = self.reqparse.parse_args()
        return  {
            'date': args['date'],
            'data': args['data']
        }, 200

    def post(self):
        args = self.reqparse.parse_args()
        return  {
            'date': args['date'],
            'data': args['data'],
        }, 200

class Year(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('year', type = str, location = 'json', required=True)
        super(Year, self).__init__()

    def get(self):
        args = self.reqparse.parse_args()
        return  {
            'year': args['year'],
        }, 200
