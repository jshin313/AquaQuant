from flask import Response, request
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
from exts import db
from models import Stats
import json

from sqlalchemy.ext.declarative import DeclarativeMeta

# Code for AlchemyEncoder from https://stackoverflow.com/questions/5022066/how-to-serialize-sqlalchemy-result-to-json
class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata' and "query" not in x]:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

class Day(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('data', type = str)
        self.reqparse.add_argument('date', type = str)
        super(Day, self).__init__()

    # Get all the data for a day
    def get(self):
        args = self.reqparse.parse_args()
        date = args['date']
        stats = Stats.query.filter_by(date=date).all()
        # print(stats)

        data = json.dumps(stats, cls=AlchemyEncoder)

        return  {
            'data': data,
        }, 200

    # Create an entry in database for a specific time frame
    def post(self):
        args = self.reqparse.parse_args()
        data = json.loads(args['data'])

        stats = Stats(date=data['date'], start_time=data['start_time'], end_time=data['end_time'], water_source=data['watersource'])

        # Prevent duplicate entrires
        if Stats.query.filter_by(date=data['date'], start_time=data['start_time'], end_time=data['end_time'], water_source=data['watersource']).first() is None:
            # Add entry if not duplicate
            db.session.add(stats)
            db.session.commit()

        return  {
            'data': data,
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

