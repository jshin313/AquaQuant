from db import db

class Stats(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.String(64))
    starting_time = db.Column(db.String(64))
    ending_time = db.Column(db.String(64))
    watersource = db.Column(db.String(64))

    def __repr__(self):
        return '<Stats {} {} {} {}>'.format(self.date, self.starting_time, self.ending_time, self.watersource)
