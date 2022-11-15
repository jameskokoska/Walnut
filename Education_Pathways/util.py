import json
import os
from nikel_py import Courses
from pathlib import Path

from keywords import KEYWORDS
from keywords import SHORTCUT


def deduplicate(course_list):
    """Remove duplicate based on course code"""
    deduplicate = []
    seen_course_codes = []
    for course in course_list:
        if course.code not in seen_course_codes:
            deduplicate.append(course)
            seen_course_codes.append(course.code)

    return deduplicate


def getCourseCode(tokens):
    """Return list of course codes"""
    code = set()
    for token in tokens:
        if (len(token) == 3 and token in KEYWORDS["code"]) or (
            len(token) > 3 and token[:3] in KEYWORDS["code"] and token[3].isnumeric()
        ):
            code.add(token)

    return list(code)


def getCategories(tokens):
    """Process user input and get categories based on KEYWORDS"""
    tokens_ = tokens
    categories = {}

    # Check each token
    default = True
    for token in tokens:
        for key in list(KEYWORDS.keys())[1:]:
            next_token = False
            for entry in KEYWORDS[key]:
                if token in entry:
                    tokens_.remove(token)

                    val = entry
                    if token in SHORTCUT:
                        val = SHORTCUT[token]

                    if key in categories:
                        categories[key] += f" {val}"
                    else:
                        categories[key] = f"{val}"
                    next_token = True
                    default = False
                    break
            if next_token:
                break

    term = ""
    if default:
        # no keyword matches, will search by name and description by default
        for token in tokens:
            term += f"{token} "

    else:
        for token in tokens_:
            term += f"{token} "

    return categories, term


def requestCourses(code, categories, term):
    """Request course based on given query"""
    courses = []
    if len(code) != 0:
        for course_code in code:
            query = categories
            query["code"] = course_code
            if term:
                for category in ("name", "description"):
                    default_query = query.copy()
                    default_query[category] = term
                    try:
                        courses.extend(Courses.get(query=default_query, limit=60))
                    except:
                        print(f"No course found for {default_query}")

            else:
                try:
                    courses.extend(
                        Courses.get(
                            query=query,
                            limit=(
                                120 if len(categories) == 1 else 60 * len(categories)
                            ),
                        )
                    )
                except:
                    print(f"No course found for {query}")

    else:
        if term:
            for category in ("name", "description"):
                default_query = {}
                default_query[category] = term
                try:
                    courses.extend(Courses.get(query=default_query, limit=60))
                except:
                    print(f"No course found for {default_query}")

        else:
            try:
                courses.extend(
                    Courses.get(query=categories, limit=120 * len(categories))
                )
            except:
                print(f"No course found for {categories}")

    courses = deduplicate(courses)
    # Add comments to courses
    
    return courses

def getCourseRatings(courseCode):
    all_ratings = {}

    # make sure file exists
    #if not Path(os.path.join(os.getcwd(), './resources/reviews.json')).is_file():
    if not os.path.isfile(os.path.join(os.getcwd(), './resources/reviews.json')):
        print('reviews.json does not exist')
        return []
    print('reviews.json exists')
    
    with open(os.path.join(os.getcwd(), './resources/reviews.json'), 'r') as f:
        all_ratings = json.load(f)

    if courseCode in all_ratings:
        return all_ratings[courseCode]
    else:
        # no reviews yet for course
        print('no reviews yet for course')
        return {
          "difficulty": { "rating": 0, "amount": 0 },
          "lecture": { "rating": 0, "amount": 0 },
          "workload": { "rating": 0, "amount": 0 },
          "tutorials": { "rating": 0, "amount": 0 },
        }

def addRating(courseCode, rating, type):
    all_reviews = {}
    # get existing reviews if file exists
    if Path('./resources/reviews.json').is_file():
        with open('./resources/reviews.json', 'r') as f:
            all_reviews = json.load(f)

    #see if the are any reviews for this course    
    if courseCode not in all_reviews:
        # no reviews yet for this course, create new list for course code
        all_reviews[courseCode] = {
          "difficulty": { "rating": 0, "amount": 0 },
          "lecture": { "rating": 0, "amount": 0 },
          "workload": { "rating": 0, "amount": 0 },
          "tutorials": { "rating": 0, "amount": 0 },
        }
    if type in all_reviews[courseCode]:
        #update the review
        x = float(all_reviews[courseCode][type]["rating"])
        y = float(all_reviews[courseCode][type]['amount'])
        z=x*y
        
        total_rating = z + float(rating)
        all_reviews[courseCode][type]["amount"] = 1 + int(all_reviews[courseCode][type]["amount"] )
        all_reviews[courseCode][type]["rating"] = total_rating / int(all_reviews[courseCode][type]['amount'])
    else:
        all_reviews[courseCode][type] = {"rating": rating, "amount": 1}
    #write to json file
    with open('./resources/reviews.json', 'w') as fw:
        json.dump(all_reviews, fw)
        
def addComment(code, name, comment, time):
    """
    Save a comment in the database
    resources/comments.json
    keys are course codes
    values are lists of dictionaries of comments
    """
    with open('./resources/comments.json', 'r') as f:
        comments = json.load(f)
        
    if code in comments:
        comments[code].append({'name': name, 'comment': comment, 'time': time})
    else:
        comments[code] = [{'name': name, 'comment': comment, 'time': time}]
    
    with open('./resources/comments.json', 'w') as fw:
        json.dump(comments, fw)
        
def getComments(code):
    """
    Get all comments for a course
    from fill resources/comments.json
    """
    with open('./resources/comments.json', 'r') as f:
        comments = json.load(f)
        
    if code in comments:
        return comments[code]
    
    return []
    

