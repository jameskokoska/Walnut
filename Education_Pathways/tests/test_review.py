# Add tests to test comment/reviews endpoints
# Author: Yu Sheng (Sam) Pan

import pytest
from index import app

def test_post_addreview_endpoint():
    """Test the addreview endpoint"""
    code="ECE444H1"
    tester = app.test_client()
    response = tester.post(f"/course/addreview?code={code}", json={
        "name": "test", 
        "review": "test",
        "time": "2020-01-01 00:00:00"
    })
    assert response.status_code == 200
    
    
def test_get_addreview_endpoint():
    """Test get the addreview endpoint"""
    code="ECE444H1"
    tester = app.test_client()
    response = tester.get(f"/course/addreview?code={code}")
    assert response.status_code == 200
    # check json to have comments key
    assert "comments" in response.json