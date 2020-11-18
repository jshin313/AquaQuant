from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from exts import db

def register_extensions(app):
    db.init_app(app)

def create_app():
    # Register api stuff I think
    app = Flask(__name__,
            static_folder = './public',
            template_folder="./static")
    #Load this config object for development mode
    app.config.from_object('configurations.DevelopmentConfig')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    register_extensions(app)
    return app


app = create_app()

@app.route('/')
@app.route('/sensors')
@app.route('/aboutwater')
@app.route('/settings')
def index():
    return render_template('index.html')

@app.route('/stats/<path:subpath>')
def stats(subpath):
    return render_template('index.html')

api = Api(app)

from backend_api.backend_api import Day, Year, On
api.add_resource(Day, '/api/day', endpoint='day')
api.add_resource(Year, '/api/year', endpoint='year')
api.add_resource(On, '/api/on', endpoint='on')


if __name__ == '__main__':
    app.run()
    db.create_all()
