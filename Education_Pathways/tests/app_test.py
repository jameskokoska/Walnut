from index import app

# Written by Kevin (Tian Li)
def test_index():
    """Test successful response code for index request"""
    tester = app.test_client()
    response = tester.get("/", content_type="html/text")
    assert response.status_code == 200
