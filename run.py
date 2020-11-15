from flask import Flask, render_template
from flask_restful import Api

app = Flask(__name__,
            static_folder = './public',
            template_folder="./static")

@app.route('/')
@app.route('/sensors')
@app.route('/aboutwater')
def index():
    return render_template('index.html')

@app.route('/stats/<path:subpath>')
def stats(subpath):
    return render_template('index.html')

# Register api stuff I think
api = Api(app)

from backend_api.backend_api import Day
api.add_resource(Day, '/day/<string:date>')


#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()
