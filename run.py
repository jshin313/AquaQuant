from flask import Flask, render_template
from flask_restful import Api
from flask_restful import reqparse
from flask_sqlalchemy import SQLAlchemy # new

app = Flask(__name__,
            static_folder = './public',
            template_folder="./static")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


@app.route('/')
@app.route('/sensors')
@app.route('/aboutwater')
@app.route('/settings')
def index():
    return render_template('index.html')

@app.route('/stats/<path:subpath>')
def stats(subpath):
    return render_template('index.html')

# Register api stuff I think
api = Api(app)

from backend_api.backend_api import Day, Year
api.add_resource(Day, '/api/day', endpoint='day')
api.add_resource(Year, '/api/year', endpoint='year')

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()
