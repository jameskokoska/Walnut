""" Backend API """
from flask import jsonify, request
from flask_restful import Resource, reqparse
from nikel_py import Courses

from util import (
    getCourseCode,
    getCategories,
    requestCourses,
    deduplicate,
    getCourseRatings,
    addRating,
    addComment,
    getComments,
)


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

        # Add comments for each course in courses_data
        for index, course in enumerate(courses_data):
            courses_data[index]["comments"] = getComments(course["code"])

        # Add ratings for each course in courses_data
        for index, course in enumerate(courses_data):
            courses_data[index]["ratings"] = getCourseRatings(course["code"])
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
        comments = getComments(code)
        ratings = getCourseRatings(code)
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp

        # Send response to the frontend
        try:
            # add list of reviews to course data
            courses[0].all_data["comments"] = comments
            courses[0].all_data["ratings"] = ratings
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
        comments = getComments(code)
        ratings = getCourseRatings(code)
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            courses[0]["comments"] = comments
            courses[0]["ratings"] = ratings
            resp = jsonify({"course": courses[0]})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class AddRating(Resource):
    def get(self):
        """
        Get all ratings for a course
        code in request query params
        """
        code = request.args.get("code")
        try:
            ratings = getCourseRatings(code)
            resp = jsonify({"ratings": ratings})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        """Add course rating

        FEtch courseCode, value, type from request body
        """

        parser = reqparse.RequestParser()
        parser.add_argument("courseCode", required=True)
        parser.add_argument("value", required=True)
        parser.add_argument("type", required=True)

        data = parser.parse_args()

        courseCode = data["courseCode"]
        value = data["value"]
        type = data["type"]

        try:
            addRating(courseCode, value, type)
            resp = jsonify({"messege": "Rating Added!"})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class AddReview(Resource):
    def get(self):
        """
        Get all comments for a course
        code in request query params
        """
        code = request.args.get("code")
        try:
            comments = getComments(code)
            resp = jsonify({"comments": comments})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        # get data from request query params code
        code = request.args.get("code")

        # get data from request body
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=True)
        parser.add_argument("comment", required=True)
        parser.add_argument("time", required=True)
        data = parser.parse_args()

        # rating = request.form['rating']
        # text = request.form['text']
        name = data["name"]
        comment = data["comment"]
        time = data["time"]

        try:
            # addReview(courseCode, rating, text)
            addComment(code, name, comment, time)
            resp = jsonify({"messege": "Comment Added!"})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp
