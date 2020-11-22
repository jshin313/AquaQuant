from eventlet import monkey_patch as monkey_patch
monkey_patch()
from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from random import random
from exts import db
from flask_socketio import SocketIO, emit

from time import sleep

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

from backend_api.backend_api import Day, Year, On, is_on
api.add_resource(Day, '/api/day', endpoint='day')
api.add_resource(Year, '/api/year', endpoint='year')
api.add_resource(On, '/api/on', endpoint='on')

socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('connect', namespace='/test')
def faucet():
    socketio.emit('faucet', {'on': is_on['faucet']}, namespace='/test')
    socketio.emit('shower', {'on': is_on['shower']}, namespace='/test')
    socketio.emit('toilet', {'on': is_on['toilet']}, namespace='/test')

if __name__ == '__main__':
    socketio.run(app)
    with app.app_context():
        db.create_all()
