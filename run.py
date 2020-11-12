from flask import Flask
app = Flask(__name__,
 	static_folder = './public',
 	template_folder="./static")

from dashboard.views import dashboard_blueprint

# register the blueprints
app.register_blueprint(dashboard_blueprint)

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()
