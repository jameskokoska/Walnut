import pandas as pd
from flask import jsonify, request
from flask_restful import Resource, reqparse

df = pd.read_csv("resources/courses.csv")


def search_course_by_code(s):

    # return all the courses whose course code contains the str s
    course_ids = df[df["Code"].str.contains(s.upper())].index.tolist()
    if len(course_ids) == 0:
        return []

    if len(course_ids) > 10:
        course_ids = course_ids[:10]

    res = []
    for i, course_id in enumerate(course_ids):
        d = df.iloc[course_id].to_dict()

        res_d = {
            "_id": i,
            "code": d["Code"],
            "name": d["Name"],
            "division": d["Division"],
            "department": d["Department"],
            "description": d["Course Description"],
            "prereq": d["Pre-requisites"],
            "level": d["Course Level"],
            "campus": d["Campus"],
            "term": d["Term"],
            "coreq": d["Corequisite"],
            "prep": d["Recommended Preparation"],
            "br": (
                ""
                if pd.isna(d["Arts and Science Breadth"])
                else ["Arts and Science Breadth"]
            ),
            "dist": (
                ""
                if pd.isna(d["Arts and Science Distribution"])
                else d["Arts and Science Distribution"]
            ),
            "exclusion": d["Exclusion"],
        }
        res.append(res_d)

    return res


class SearchCourse(Resource):
    def get(self):
        input = request.args.get("input")
        courses = search_course_by_code(input)

        if len(courses) > 0:
            try:
                resp = jsonify(courses)
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
        courses = search_course_by_code(input)
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
        courses = search_course_by_code(code)
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

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        code = data["code"]
        courses = search_course_by_code(code)
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
