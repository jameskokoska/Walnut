from index import app
from api import search_course_by_code

# Written by Kevin (Tian Li)
def test_index():
    """Test successful response code for index request"""
    tester = app.test_client()
    response = tester.get("/", content_type="html/text")
    assert response.status_code == 200

# Written by James Kokoska
def test_course_details():
    """"Test course result found in database and result matches expected"""
    ECE444_result = search_course_by_code("ECE444")
    ECE444_expected = {'_id': 0, 'code': 'ECE444H1', 'name': 'Software Engineering', 'division': 'Faculty of Applied Science & Engineering', 'department': 'Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.', 'description': 'The software development process. Software requirements and specifications. Software design techniques. Techniques for developing large software systems; CASE tools and software development environments. Software testing, documentation and maintenance.', 'prereq': "['ECE344H1', 'ECE353H1']", 'level': 4, 'campus': 'St. George', 'term': "['2021 Fall']", 'coreq': '[]', 'prep': '[]', 'br': '', 'dist': '', 'exclusion': '[]'}
    assert ECE444_expected == ECE444_result[0]
    assert ECE444_result[0]["code"] == "ECE444H1"
    assert ECE444_result[0]["name"] == "Software Engineering"
