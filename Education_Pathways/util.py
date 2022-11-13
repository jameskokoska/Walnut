from nikel_py import Courses

from keywords import KEYWORDS
from keywords import SHORTCUT


def deduplicate(course_list):
    deduplicate = []
    seen_course_codes = []
    for course in course_list:
        if course.code not in seen_course_codes:
            deduplicate.append(course)
            seen_course_codes.append(course.code)

    return deduplicate


def getCategories(input):
    """Process user input and get categories based on KEYWORDS"""
    code = set()
    categories = {}

    # Check each token
    default = True
    for token in input:

        # Coures Code
        if (len(token) == 3 and token in KEYWORDS["code"]) or (
            len(token) > 3 and token[:3] in KEYWORDS["code"] and token[3].isnumeric()
        ):
            code.add(token)
            default = False
            continue

        for key in list(KEYWORDS.keys())[1:]:
            next_token = False
            for entry in KEYWORDS[key]:
                if token in entry:
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
        for token in input:
            if token not in code:
                term += f"{token} "

    return code, categories, default, term


def requestCourses(code, categories, default, term):
    courses = []
    if len(code) != 0:
        for course_code in code:
            query = categories
            query["code"] = course_code
            if default:
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
                                90 if len(categories) == 1 else 60 * len(categories)
                            ),
                        )
                    )
                except:
                    print(f"No course found for {query}")

    else:
        if default:
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
