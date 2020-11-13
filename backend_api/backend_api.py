from flask import Response, request
from flask_restful import Resource

class Day(Resource):
    def get(self, date):
        return  { 'the_date': date }, 200
