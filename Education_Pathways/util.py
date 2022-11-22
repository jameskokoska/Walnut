""" Utility Functions """

from nikel_py import Courses

from keywords import KEYWORDS
from keywords import SHORTCUT
from model import Rating


def deduplicate(course_list):
    """Remove duplicates if any"""
    deduplicate = []
    seen_courses = []
    for course in course_list:
        if course.id not in seen_courses:
            deduplicate.append(course)
            seen_courses.append(course.id)

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
        # Term will be the ones remaining
        for token in tokens_:
            term += f"{token} "

    return categories, term


def requestCourses(code, categories, term):
    """Request course based on given query"""
    courses = []

    # Course Code gets priority
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

    # No Course Code
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

    return deduplicate(courses)


def getCourseRatings(courseCode):
    rating_obj = Rating.objects(code=courseCode)
    ratings = {
        "difficulty": 0,
        "lecture": 0,
        "workload": 0,
        "tutorial": 0,
        "amount": ([0, 0, 0, 0] if len(rating_obj) == 0 else rating_obj[0].amount),
    }

    for rating in rating_obj:
        ratings["difficulty"] = (
            float(rating.difficulty) / rating.amount[0]
            if rating.amount[0] != 0
            else rating.difficulty
        )
        ratings["lecture"] = (
            float(rating.lecture) / rating.amount[1]
            if rating.amount[1] != 0
            else rating.lecture
        )
        ratings["workload"] = (
            float(rating.workload) / rating.amount[2]
            if rating.amount[2] != 0
            else rating.workload
        )
        ratings["tutorial"] = (
            float(rating.tutorial) / rating.amount[3]
            if rating.amount[3] != 0
            else rating.tutorial
        )

    print(ratings)
    return ratings


def addCourseRating(courseCode, _rating, _type):
    rating = Rating.objects(code=courseCode)

    # No available data, create a new instance
    if len(rating) == 0:
        rating = Rating(
            code=courseCode,
            difficulty=0,
            lecture=0,
            workload=0,
            tutorial=0,
            amount=[0, 0, 0, 0],
        )
    else:
        rating = rating[0]

    match _type:
        case "difficulty":
            rating.difficulty += int(_rating)
            rating.amount[0] += 1
        case "lecture":
            rating.lecture += int(_rating)
            rating.amount[1] += 1
        case "workload":
            rating.workload += int(_rating)
            rating.amount[2] += 1
        case "tutorial":
            rating.tutorial += int(_rating)
            rating.amount[3] += 1

    rating.save()
