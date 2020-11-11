from flask import render_template, Blueprint
dashboard_blueprint = Blueprint('dashboard',__name__)

@dashboard_blueprint.route('/')
def index():
    return render_template("index.html")

# @dashboard_blueprint.route('/dashboard')
