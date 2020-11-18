from exts import db

class Stats(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.String(64))
    start_time = db.Column(db.String(64))
    end_time = db.Column(db.String(64))
    water_source = db.Column(db.String(64))

    def __repr__(self):
        return '<Stats {} {} {} {}>'.format(self.date, self.start_time, self.end_time, self.water_source)
