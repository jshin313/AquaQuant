from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__,
            static_folder = './public',
            template_folder="./static")


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

from backend_api.backend_api import Day, Year, On
api.add_resource(Day, '/api/day', endpoint='day')
api.add_resource(Year, '/api/year', endpoint='year')
api.add_resource(On, '/api/on', endpoint='on')

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')

if __name__ == '__main__':
    from db import db
    db.create_all()
    app.run()
