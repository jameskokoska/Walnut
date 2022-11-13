from flask import jsonify, request
from flask_restful import Resource, reqparse
from nikel_py import Courses

from keywords import KEYWORDS


def getCategories(input):
    """Process user input and get categories based on KEYWORDS"""

    # Course code should not repeat, hence set()
    categories = {"code": set()}

    # Check each token
    for token in input:
        # check first three letters and if fourth is number to see if it's a course code
        if (len(token) == 3 and token in KEYWORDS["code"]) or (
            len(token) > 3 and token[:3] in KEYWORDS["code"] and token[3].isnumeric()
        ):
            categories["code"].add(token)

        # start after code category, check if input is in keyword dictionary
        for key in list(KEYWORDS.keys())[1:]:
            for entry in KEYWORDS[key]:
                if token in entry:
                    if key in categories:
                        categories[key].append(token)
                    else:
                        categories[key] = [token]

    if len(categories) == 1 and len(categories["code"]) == 0:
        # no keyword matches, will search by name and description by default
        term = "".join(token for token in input)
        categories["name"] = [term]
        categories["description"] = [term]

    return categories


class SearchCourse(Resource):
    def get(self):
        # Get input and tokenize based on spaces
        # KEYWORDS has lowercase elements, hence input.lower()
        input = request.args.get("input")
        input = input.lower().split(" ")

        # Generate categories
        categories = getCategories(input)
        print(categories)

        courses = []
        for category in categories:
            for token in categories[category]:
                # update set with search results
                try:
                    courses.extend(Courses.get({category: token}, limit=45))
                except:
                    continue

        # convert from Course objects to json
        courses_data = []
        for course in list(courses):
            courses_data.append(course.all_data)

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
