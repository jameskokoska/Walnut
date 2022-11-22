from config import db


class Rating(db.Document):
    code = db.StringField(required=True, unique=True)
    difficulty = db.DecimalField()
    lecture = db.DecimalField()
    workload = db.DecimalField()
    tutorial = db.DecimalField()
    amount = db.ListField(db.IntField())


class Comment(db.Document):
    code = db.StringField(required=True)
    name = db.StringField(required=True)
    comment = db.StringField(required=True)
    time = db.StringField(required=True)
