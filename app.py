from eventlet import monkey_patch as monkey_patch
monkey_patch()
from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from random import random
from exts import db
from flask_socketio import SocketIO, emit

from time import sleep
from threading import Thread, Event

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

socketio = SocketIO(app, async_mode=None, logger=True, engineio_logger=True)
# socketio = SocketIO(app, cors_allowed_origins="*")

thread1 = Thread()
thread2 = Thread()
thread3 = Thread()
thread_stop_event = Event()

def faucet():
    """
    Generate a random number every 1 second and emit to a socketio instance (broadcast)
    Ideally to be run in a separate thread?
    """
    #infinite loop of magical random numbers
    print("Making random numbers")
    while not thread_stop_event.isSet():
        socketio.emit('faucet', {'on': is_on['faucet']}, namespace='/test')
        socketio.sleep(0.9)

def shower():
    """
    Generate a random number every 1 second and emit to a socketio instance (broadcast)
    Ideally to be run in a separate thread?
    """
    #infinite loop of magical random numbers
    print("Making random numbers")
    while not thread_stop_event.isSet():
        socketio.emit('shower', {'on': is_on['shower']}, namespace='/test')
        socketio.sleep(0.9)

def toilet():
    """
    Generate a random number every 1 second and emit to a socketio instance (broadcast)
    Ideally to be run in a separate thread?
    """
    #infinite loop of magical random numbers
    print("Making random numbers")
    while not thread_stop_event.isSet():
        number = round(random()*10, 3)
        print(number)
        socketio.emit('toilet', {'on': is_on['toilet']}, namespace='/test')
        socketio.sleep(0.9)

@socketio.on('connect', namespace='/test')
def test_connect():
    # need visibility of the global thread object
    global thread1
    global thread2
    global thread3
    print('Client connected')

    #Start the random number generator thread only if the thread has not been started before.
    if not thread1.isAlive():
        print("Starting Thread")
        thread1 = socketio.start_background_task(faucet)

    if not thread2.isAlive():
        print("Starting Thread")
        thread2 = socketio.start_background_task(shower)

    if not thread3.isAlive():
        print("Starting Thread")
        thread3 = socketio.start_background_task(toilet)


# # Handler for a message recieved over 'connect' channel
# @socketio.on('faucet_status')
# def faucet_status():
#     emit('faucet',  {'on': is_on['faucet']})

if __name__ == '__main__':
    socketio.run(app)
    with app.app_context():
        db.create_all()
