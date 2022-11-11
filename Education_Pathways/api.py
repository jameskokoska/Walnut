from flask import jsonify, request
from flask_restful import Resource, reqparse
from nikel_py import Courses


class SearchCourse(Resource):
    def get(self):
        input = request.args.get("input")
        courses = Courses.get({"code": input}, limit=100)
        # convert from Course objects to json
        courses_data = []
        for course in courses:
            courses_data.append(course.all_data)

        if len(courses) > 0:
            try:
                resp = jsonify(courses_data)
                resp.status_code = 200
                return resp
            except Exception as e:
                resp = jsonify({"error": str(e)})
                resp.status_code = 400
                return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("input", required=True)
        data = parser.parse_args()
        input = data["input"]
        courses = Courses.get({"code": input})
        if len(courses) > 0:
            try:
                resp = jsonify(courses)
                resp.status_code = 200
                return resp
            except Exception as e:
                resp = jsonify({"error": "something went wrong"})
                resp.status_code = 400
                return resp


class ShowCourse(Resource):
    def get(self):
        code = request.args.get("code")
        courses = Courses.get({"code": code})
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify(courses[0].all_data)
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        code = data["code"]
        courses = Courses.get({"code": code})
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({"course": courses[0]})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp
