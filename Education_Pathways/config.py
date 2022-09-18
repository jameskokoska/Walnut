# This is to prevent circular imports

from flask_mongoengine import MongoEngine
from flask_cors import CORS

app = None
db = None
cors = None

def init_app(app_):
    global app
    app = app_
    return app

def init_db(app):
    global db
    db = MongoEngine(app)
    return db

def init_cors(app):
    global cors
    cors = CORS(app)
    return cors