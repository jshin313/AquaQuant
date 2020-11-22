from flask import Response, request
from flask_restful import reqparse, abort, Api, Resource
from flask_sqlalchemy import SQLAlchemy
from exts import db
from models import Stats
import json
from dateutil import rrule
import math
from datetime import datetime

from sqlalchemy.ext.declarative import DeclarativeMeta
from backend_api.convert import convert_to_gallons

is_on = {
    'faucet': False,
    'toilet': False,
    'shower': False,
}

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


        # Prevent duplicate entrires
        if Stats.query.filter_by(date=data['date'], start_time=data['start_time'], end_time=data['end_time'], water_source=data['water_source']).first() is None:
            # Add entry if not duplicate
            stats = Stats(date=data['date'], start_time=data['start_time'], end_time=data['end_time'], water_source=data['water_source'])
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

        # days_in_year = Stats.query.filter(Stats.date.endswith(args['year'])).all()
        # print(days_in_year)

        a = '01-01-' + args['year']
        b = '12-31-' + args['year']

        return_dict = {}

        for dt in rrule.rrule(rrule.DAILY, dtstart=datetime.strptime(a, '%m-%d-%Y'), until=datetime.strptime(b, '%m-%d-%Y')):
            date = dt.strftime('%m-%d-%Y')

            total_gallons_in_day = 0.0
            for row in Stats.query.filter_by(date=date).all():
                total_gallons_in_day+=convert_to_gallons(row.start_time, row.end_time, row.water_source)

            # If there is no date availabe then skip
            if (math.isclose(total_gallons_in_day, 0.0, rel_tol=1e-3)):
                continue

            return_dict[date] = total_gallons_in_day

            print("Total Gallons in day " + str(total_gallons_in_day))

        return  {
            'year': args['year'],
            'data': return_dict,
        }, 200

class On(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('on', type = str)
        self.reqparse.add_argument('water_source', type=str, required=True)
        super(On, self).__init__()

    def get(self):
        args = self.reqparse.parse_args()
        water_source = args['water_source']
        print(water_source)
        return  {
            'water_source': args['water_source'],
            'on': is_on[water_source],
        }, 200

    # Tell the UI that water source is on or off
    def post(self):
        args = self.reqparse.parse_args()
        print("args['on']: " + str(args['on']))
        if args['on'] == 'True':
            is_on[args['water_source']] = True
        else:
            is_on[args['water_source']] = False

        return  {
            'water_source': args['water_source'],
            'on': args['on'],
        }, 200

