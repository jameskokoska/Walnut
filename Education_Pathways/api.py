from flask import jsonify, request
from flask_restful import Resource, reqparse
from nikel_py import Courses

def getCategories(input):
        categories = []
        # check first three letters to see if it's a course code
        if len(input) > 3 and input[:3] in courseKeyWords['code']:
            # code search gets priority, no need to check other categories
            return ["code"]
        
        # start after code category, check if input is in keyword dictionary
        for k in list(courseKeyWords.keys())[1:]:
            if input in courseKeyWords[k]:
                categories.append(k)

        if categories == []:
            # no keyword matches, will search by name and description by default
            categories.extend(["name", "description"])

        return categories

courseKeyWords = {
    "code": {
        "jhe",
        "cdp",
        "for",
        "ece",
        "jls",
        "cri",
        "rlg",
        "sah",
        "urb",
        "wri",
        "ast",
        "jig",
        "acm",
        "ess",
        "nml",
        "spa",
        "lin",
        "mga",
        "crt",
        "fsl",
        "jsc",
        "ggr",
        "jcp",
        "psl",
        "jnr",
        "cit",
        "est",
        "jeh",
        "smu",
        "phc",
        "sta",
        "hsc",
        "mcs",
        "smc",
        "vps",
        "lat",
        "ppg",
        "cps",
        "ers",
        "lte",
        "chc",
        "cct",
        "his",
        "jep",
        "pey",
        "jps",
        "mgh",
        "bpm",
        "uni",
        "ire",
        "ent",
        "fre",
        "jga",
        "las",
        "cre",
        "hps",
        "grk",
        "ins",
        "ara",
        "ids",
        "mgr",
        "sas",
        "hun",
        "hmb",
        "pol",
        "bio",
        "lgg",
        "bme",
        "arh",
        "cog",
        "lmp",
        "bcb",
        "thr",
        "hst",
        "ita",
        "vst",
        "jal",
        "ees",
        "jsu",
        "cla",
        "esc",
        "jfg",
        "tmu",
        "pln",
        "env",
        "vcc",
        "jpr",
        "psc",
        "soc",
        "apm",
        "eas",
        "cse",
        "prt",
        "wgs",
        "mgi",
        "ren",
        "dts",
        "emu",
        "lct",
        "cjh",
        "eds",
        "bch",
        "jeg",
        "trn",
        "fcs",
        "dhu",
        "jph",
        "aer",
        "chm",
        "cop",
        "fin",
        "mst",
        "pma",
        "vph",
        "jbh",
        "pcl",
        "jav",
        "min",
        "imi",
        "jca",
        "jmu",
        "fsc",
        "jln",
        "phy",
        "cme",
        "jwe",
        "jge",
        "jpi",
        "jsh",
        "jha",
        "mus",
        "fah",
        "pcj",
        "vpa",
        "fld",
        "utm",
        "phl",
        "jfl",
        "jlp",
        "mun",
        "act",
        "vis",
        "aps",
        "afr",
        "ams",
        "jnh",
        "drs",
        "mgm",
        "eeb",
        "pmd",
        "hin",
        "muz",
        "eco",
        "eur",
        "dre",
        "ger",
        "mmu",
        "wst",
        "mij",
        "psy",
        "ana",
        "eth",
        "jgu",
        "mhb",
        "imm",
        "nme",
        "csb",
        "mgd",
        "mie",
        "nmc",
        "jqr",
        "nfs",
        "wdw",
        "ltl",
        "jcb",
        "car",
        "pes",
        "pmu",
        "pun",
        "jpa",
        "jpe",
        "sds",
        "csc",
        "ini",
        "afs",
        "mgs",
        "chi",
        "fst",
        "tep",
        "ect",
        "urd",
        "rsm",
        "jbc",
        "jpm",
        "mat",
        "pli",
        "rob",
        "hmu",
        "drm",
        "bms",
        "cta",
        "jns",
        "ant",
        "jou",
        "gas",
        "jci",
        "mse",
        "cas",
        "hlt",
        "cjs",
        "eng",
        "mds",
        "pdc",
        "arc",
        "jpf",
        "mgt",
        "vic",
        "jre",
        "mgy",
        "mge",
        "civ",
        "fas",
        "clt",
        "sla",
        "nro",
        "new",
        "isp",
        "ctl",
        "jfp",
        "mgf",
        "cin",
        "wrr",
        "omu",
        "cdn",
        "phs",
        "mgo",
        "che",
        "abp",
    },
    "division": {
        "faculty of applied science & engineering",
        "faculty of music",
        "faculty of arts and science",
        "university of toronto mississauga",
        "university of toronto scarborough",
        "john h. daniels faculty of architecture, landscape, & design",
    },
    "department": {
        "indigenous studies arts & science",
        "munk school of global affairs and public policy",
        "physiology",
        "division of engineering science",
        "computer science",
        "molecular genetics",
        "dept. of historical & cultural studies (utsc)",
        "faculty of music",
        "mathematical and computational sciences",
        "geography and planning",
        "anatomy and cell biology",
        "sociology (utsc)",
        "centre for teaching and learning (utsc)",
        "language studies",
        "cross disciplinary programs office",
        "art history",
        "italian studies",
        "asdn: arts and science, office of the dean",
        "trinity college",
        "mathematics",
        "mechanical & industrial engineering",
        "spanish and portuguese",
        "centre for study of united states",
        "health and society (utsc)",
        "institute for management and innovation",
        "faculty of applied science & engineering",
        "political science",
        "political science (utsc)",
        "jewish studies",
        "john h. daniels faculty of architecture, landscape, & design",
        "ecology and evolutionary biology",
        "english and drama",
        "chemical and physical sciences",
        "economics",
        "arts & science internship program",
        "centre for criminology and sociolegal studies",
        "astronomy and astrophysics",
        "human biology program",
        "psychology (utsc)",
        "rotman commerce",
        "french",
        "chemical engineering and applied chemistry",
        "centre for ethics",
        "east asian studies",
        "english (utsc)",
        "pharmacology",
        "earth sciences",
        "immunology",
        "institute for the study of university pedagogy",
        "history",
        "centre for diaspora & transnational studies",
        "classics",
        "centre for european, russian and eurasian studies",
        "germanic languages & literatures",
        "dept. of physical & environmental sci (utsc)",
        "centre for entrepreneurship",
        "physics",
        "psychology",
        "biochemistry",
        "faculty of arts and science",
        "materials science and engineering",
        "laboratory medicine and pathobiology",
        "canadian institute for theoretical astrophysics",
        "cinema studies institute",
        "st. michael's college",
        "woodsworth college",
        "university college",
        "biology",
        "visual studies",
        "sexual diversity studies",
        "engineering first year office",
        "institute of communication and culture",
        "dept. of arts, culture & media (utsc)",
        "university of toronto scarborough",
        "women and gender studies institute",
        "language studies (utsc)",
        "contemporary east and southeast asian studies",
        "statistical sciences",
        "linguistics",
        "inst. for the history & philosophy of science & technology",
        "philosophy (utsc)",
        "nutritional sciences",
        "cell and systems biology",
        "biological sciences (utsc)",
        "institute of biomedical engineering",
        "english",
        "management",
        "school of environment",
        "civil and mineral engineering",
        "dept. of computer & mathematical sci (utsc)",
        "south asian studies",
        "management (utsc)",
        "centre for medieval studies",
        "anthropology",
        "global development studies (utsc)",
        "university of toronto mississauga",
        "anthropology (utsc)",
        "philosophy",
        "centre for drama, theatre and performance studies",
        "inst for studies in transdisciplinary engin educ & practice",
        "victoria college",
        "new college",
        "department for the study of religion",
        "near & middle eastern civilizations",
        "human geography (utsc)",
        "edward s. rogers sr. dept. of electrical & computer engin.",
        "slavic languages and literatures",
        "centre for industrial relations and human resources",
        "innis college",
        "historical studies",
        "chemistry",
        "sociology",
        "geography, geomatics and environment",
    },
    "level": {"600", "100", "300", "000", "700", "400", "500", "200"},
    "campus": {"st. george", "scarborough", "mississauga"},
    "term": {
        "2022 summer f",
        "2021 winter",
        "2021 summer y",
        "2021 fall",
        "2022 summer y",
        "2020 fall",
        "2022 summer s",
        "2022 winter",
    },
    "arts_and_science_breadth": {
        "(1) creative and cultural representation",
        "(4) living things and their environment",
        "(2) thought, belief and behaviour + (1) creative and cultural representation",
        "(3) society and its institutions + (1) creative and cultural representation",
        "(5) the physical and mathematical universes",
        "(3) society and its institutions",
        "(4) living things and their environment + (3) society and its institutions",
        "(4) living things and their environment + (5) the physical and mathematical universes",
        "(3) society and its institutions + (2) thought, belief and behaviour",
        "(5) the physical and mathematical universes + (3) society and its institutions",
        "(2) thought, belief and behaviour",
    },
    "arts_and_science_distribution": {
        "social science",
        "humanities",
        "science",
    },
    "utm_distribution": {
        "social science",
        "humanities",
        "science",
    },
    "utsc_breadth": {
        "history, philosophy & cultural studies",
        "natural sciences",
        "quantitative reasoning",
        "arts, literature & language",
        "social & behavioural sciences",
    },
    "apsc_electives": {
        "complementary studies",
        "humanities & social sciences",
        "apsc-natural science",
    },
}

class SearchCourse(Resource):
    def get(self):
        input = request.args.get("input")
        # keywordDict has lowercase elements, hence input.lower()
        categories = getCategories(input.lower())
        print(categories)
        courses = set()
        for category in categories:
            # update set with search results
            try:
                courses.update(Courses.get({category: input}, limit=50))
                print(courses)
            except:
                continue

        # convert from Course objects to json
        courses_data = []
        for course in list(courses):
            courses_data.append(course.all_data)

        try:
            resp = jsonify(courses_data)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({"error": str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("input", required=True)
        data = parser.parse_args()
        input = data["input"]
        categories = getCategories(input.lower())
        courses = set()
        for category in categories:
            # update set with search results
            try:
                courses.update(Courses.get({category: input}, limit=100))
            except:
                continue
        
        coursesL = list(courses)
        if len(coursesL) > 0:
            try:
                resp = jsonify(coursesL)
                resp.status_code = 200
                return resp
            except Exception as e:
                resp = jsonify({"error": "something went wrong"})
                resp.status_code = 400
                return resp
    

class ShowCourse(Resource):
    def get(self):
        code = request.args.get("code")
        courses = Courses.get({"code": code})
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify(courses[0].all_data)
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("code", required=True)
        data = parser.parse_args()
        code = data["code"]
        courses = Courses.get({"code": code})
        if len(courses) == 0:
            resp = jsonify({"message": f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({"course": courses[0]})
            resp.status_code = 200
            return resp
        except Exception:
            resp = jsonify({"error": "something went wrong"})
            resp.status_code = 400
            return resp

