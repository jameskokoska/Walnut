from flask import jsonify, request
from flask_restful import Resource, reqparse
from nikel_py import Courses

from util import getCourseCode, getCategories, requestCourses, deduplicate, getCourseReviews, addReview


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
            if len(courses) != 0 and len(courses) < 10:
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

        try:
            resp = {"courses_data": courses_data, "term": term}
            resp = jsonify(resp)
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
        categories = getCategories(input.lower())
        courses = set()
        for category in categories:
            # update set with search results
            try:
                courses.update(Courses.get({category: input}, limit=100))
            except:
                continue

        coursesL = list(courses)
        if len(coursesL) > 0:
            try:
                resp = jsonify(coursesL)
                resp.status_code = 200
                return resp
            except Exception as e:
                resp = jsonify({"error": "something went wrong"})
                resp.status_code = 400
                return resp


class ShowCourse(Resource):
    def get(self):
        code = request.args.get("code")
        print(code)
        courses = Courses.get({"code": code})
        reviews = getCourseReviews(code)
        print(reviews)
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            #add list of reviews to course data
            courses[0].all_data['reviews'] = reviews
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
        reviews = getCourseReviews(code)
        print(reviews)
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            courses[0]['reviews'] = reviews
            resp = jsonify({"course": courses[0]})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp


class AddReview(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        courseCode = data["code"]

        rating = request.form['rating']
        text = request.form['text']

        try:
            addReview(courseCode, rating, text)
            resp = jsonify({"messege": "Review Added!"})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

