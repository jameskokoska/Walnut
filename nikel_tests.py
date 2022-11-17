from nikel_py import Courses
import json

'''
Creates a list (limited to 1) of courses that have the name "Introduction to Computer 
Programming"
'''

x = Courses.get({'code' : 'ece4'})
print(len(x))
for course in x:
    print(course.all_data)

