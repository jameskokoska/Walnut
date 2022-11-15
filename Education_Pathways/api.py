""" Backend API """
from flask import jsonify, request
from flask_restful import Resource, reqparse
from nikel_py import Courses

from util import getCourseCode, getCategories, requestCourses, deduplicate


class SearchCourse(Resource):
    def get(self):
        # Get input and tokenize based on spaces
        input = request.args.get("input")
        tokens = input.lower().split(" ")

        # Course code gets priority
        code = getCourseCode(tokens)
        tokens = [token for token in tokens if token not in code]

        # No code, search for course name first
        if len(code) == 0:
            try:
                courses = Courses.get({"name": input})
                courses.extend(Courses.get({"description": input}))
                courses = deduplicate(courses)
            except:
                courses = []

            # There is course found and only a few specific ones
            if len(courses) != 0 and len(courses) < 20:
                term = input

            # Fall back to general search
            else:
                categories, term = getCategories(tokens)
                courses = requestCourses(code, categories, term)

        # General search
        else:
            categories, term = getCategories(tokens)
            courses = requestCourses(code, categories, term)

        # convert from Course objects to json
        courses_data = []
        for course in list(courses):
            courses_data.append(course.all_data)

        # Send response to the frontend
        try:
            resp = {"courses_data": courses_data, "term": term}
            resp = jsonify(resp)
            resp.status_code = 200
            return resp

        # Failed to send response
        except Exception as e:
            resp = jsonify({"error": str(e)})
            resp.status_code = 400
            return resp


class ShowCourse(Resource):
    def get(self):
        # Search only by course code
        code = request.args.get("code")
        courses = Courses.get({"code": code})

        # No Course Found
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp

        # Send response to the frontend
        try:
            resp = jsonify(courses[0].all_data)
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp
