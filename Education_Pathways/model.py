from config import db


class Review(db.Document):
    code = db.StringField(required=True, unique=True)
    difficulty = db.IntField(required=True)
    lecture = db.IntField(required=True)
    workload = db.IntField(required=True)
    tutorial = db.IntField(required=True)


class Comment(db.Document):
    code = db.StringField(required=True, unique=True)
    name = db.StringField()
    comment = db.StringField(required=True)
    time = db.StringField(required=True)
