import os
from flask import Flask, send_from_directory
from flask_restful import Api

import config
from api import SearchCourse, ShowCourse, AddReview, AddRating

# App Configuration
app = Flask(__name__, static_folder="frontend/build")
app.config["ENV"] = "development"
app.config["DEBUG"] = True
app.config["TESTING"] = True

config.init_app(app)
config.init_cors(app)

# API Endpoints
rest_api = Api(app)
rest_api.add_resource(SearchCourse, "/searchc")
rest_api.add_resource(ShowCourse, "/course/details")
rest_api.add_resource(AddReview, "/course/addreview")
rest_api.add_resource(AddRating, "/course/addrating")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(threaded=True, port=5000)
