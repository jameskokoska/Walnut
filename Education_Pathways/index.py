# this is the flask core

from flask import Flask, send_from_directory
from flask_restful import Api
import os

import config

app = Flask(__name__, static_folder='frontend/build')
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True
# MongoDB URI
DB_URI = "mongodb+srv://Cansin:cv190499@a-star.roe6s.mongodb.net/A-Star?retryWrites=true&w=majority"
app.config["MONGODB_HOST"] = DB_URI

config.init_app(app)
config.init_db(app)
config.init_cors(app)

# API Endpoints
import controller
api = Api(app)
api.add_resource(controller.UserRegistration, '/user/register')
api.add_resource(controller.UserLogin, '/user/login')

api.add_resource(controller.SearchCourse, '/searchc')
api.add_resource(controller.ShowCourse, '/course/details')
api.add_resource(controller.ShowCourseGraph, '/course/graph')

api.add_resource(controller.UserWishlist, '/user/wishlist')
api.add_resource(controller.UserWishlistAdd, '/user/wishlist/addCourse')
api.add_resource(controller.UserWishlistRemove, '/user/wishlist/removeCourse')
api.add_resource(controller.UserWishlistMinorCheck, '/user/wishlist/minorCheck')

@app.route("/", defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000, extra_files=['app.py', 'controller.py', 'model.py'])
    app.run(threaded=True, port=5000)
    # with open("test.json") as f:
    #     data = json.load(f)
    # for i in range(75):
    #     i = str(i)
    #     Course(name=data["name"][i], code=data["code"][i], description=data["description"][i], prereq=data["prereq"][i], coreq=data["coreq"][i], exclusion=data["exclusion"][i]).save()

    
    
