""" Utility Functions """
from nikel_py import Courses

from keywords import KEYWORDS
from keywords import SHORTCUT


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
