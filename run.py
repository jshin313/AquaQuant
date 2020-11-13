from flask import Flask
from flask_restful import Api

app = Flask(__name__,
            static_folder = './public',
            template_folder="./static")

# Register api stuff I think
api = Api(app)

from dashboard.views import dashboard_blueprint

# register the blueprints
app.register_blueprint(dashboard_blueprint)

from backend_api.backend_api import Day
api.add_resource(Day, '/day/<string:date>')


#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()
