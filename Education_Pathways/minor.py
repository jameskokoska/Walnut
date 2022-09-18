# using hard-coded data for testing purpose, should be fetch in database later on
engineering_minor_list = {
    'Artificial Intelligence Minor' : [],
    'Advanced Manufacturing Minor' : [],
    'Bioengineering Minor' : [],
    'Environmental Engineering Minor' : [],
    'Sustainable Energy Minor' : [],
    'Engineering Business Minor' : [],
    'Robotics and Mechatronics Minor' : [],
    'Biomedical Engineering Minor' : ["CHE353H1F", "BME331H1S", "BME440H1", "MIE439H1S", "BME530H1S", "BME499Y1Y", "BME498Y1Y"],
    'Nanoengineering Minor' : [],
    'Music Performance Minor' : [],
}

# Calcualting the percentage of minor fulfillment
def check_course_in_minor(course):
    minor = None
    for i in engineering_minor_list:
        if course in engineering_minor_list[i]:
            minor = i

    return minor
