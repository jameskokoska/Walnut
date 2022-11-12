# This file is used to generate the keywords for different course terms
import json

keywordDict = {
    'code': set(),
    'division': set(),
    'department': set(),
    'level': set(),
    'campus': set(),
    'term': set(),
    'arts_and_science_breadth': set(),
    'arts_and_science_distribution': set(),
    'utm_distribution': set(),
    'utsc_breadth': set(),
    'apsc_electives': set()
}

with open("Education_Pathways\\resources\courses.json") as jsonFile:
    data = json.load(jsonFile)
    categories = keywordDict.keys()
    for course in data:
        for category in categories:
            if course[category] != None:
                if category == 'code':
                    #only first 3 letters of code
                    keywordDict[category].add(course[category][:3].lower())
                else:
                    #add lowercase value to category's set
                    keywordDict[category].add(course[category].lower())



with open("Education_Pathways\\resources\keywordDict.txt", 'w') as f:
    print(keywordDict, file=f)

