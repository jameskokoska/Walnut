from app import app
from minor import check_course_in_minor
from flask.testing import FlaskClient


# Jean
def test_check_course_in_minor():
    course = "MIE439H1S"
    minor = "Biomedical Engineering Minor"
    result = check_course_in_minor(course)

    assert result == minor

# Cansin
def test_user_register_endpoint():
    tester = app.test_client()
    response = tester.get("/user/register")

    assert response.status_code == 200

def test_user_login_endpoint():
    tester = app.test_client()
    response = tester.get("/user/login")

    assert response.status_code == 200

def test_search_endpoint():
    tester = app.test_client()
    response = tester.get("/search")

    assert response.status_code == 200

def test_course_details_endpoint():
    tester = app.test_client()
    response = tester.get("/course/details?code=ECE318H1")

    assert response.status_code == 200

def test_course_graph_endpoint():
    tester = app.test_client()
    response = tester.get("/course/graph?code=ECE318H1")

    assert response.status_code == 200

def test_user_wishlist_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist")

    assert response.status_code == 200

def test_user_wishlist_addCourse_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist/addCourse")

    assert response.status_code == 200

def test_user_wishlist_removeCourse_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist/removeCourse")

    assert response.status_code == 200

def test_user_wishlist_minorCheck_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist/minorCheck")

    assert response.status_code == 200

