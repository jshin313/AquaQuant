from flask import Response, request
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
# from db import db

class Day(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('date', type = str, required=True)
        self.reqparse.add_argument('data', type = str)
        super(Day, self).__init__()

    # Get all the data for a day
    def get(self):
        args = self.reqparse.parse_args()
        return  {
            'date': args['date'],
        }, 200

    # Create an entry in database for a specific time frame
    def post(self):
        args = self.reqparse.parse_args()
        print(args)

        return  {
            'date': args['date'],
            'data': args['data'],
        }, 200

class Year(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('year', type = str, required=True)
        super(Year, self).__init__()

    def get(self):
        args = self.reqparse.parse_args()
        return  {
            'year': args['year'],
        }, 200

class On(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('on', type = bool, required=True)
        self.reqparse.add_argument('watersource', type = string, required=True)
        super(Year, self).__init__()

    # Tell the UI that water source is on or off
    def post(self):
        args = self.reqparse.parse_args()
        return  {
            args['on'],
            args['watersource'],
        }, 200

