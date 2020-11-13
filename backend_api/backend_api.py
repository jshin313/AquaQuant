from flask import Response, request, jsonify
from flask_restful import Resource

class Day(Resource):
    def get(self, date):
        return jsonify( { 'the_date': date } )
