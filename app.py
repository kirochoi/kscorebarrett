from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from sqlalchemy import func
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/karatescore'
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

class Client(db.Model):
    __tablename__ = 'client'
    clientemail = db.Column(db.String(255), primary_key=True)
    clientphone = db.Column(db.String(10))
    clientname = db.Column(db.String(255))

class Competitor(db.Model):
    __tablename__ = 'competitor'
    compname = db.Column(db.String(255))
    compid = db.Column(db.Integer, primary_key=True)
    compage = db.Column(db.Integer)
    compskill = db.Column(db.String(255))
    compdiv = db.Column(db.String(255))
    assocemail = db.Column(db.String(255), db.ForeignKey('client.clientemail'))

class Match(db.Model):
    __tablename__ = 'match'
    tournament = db.Column(db.Integer, db.ForeignKey('tournament.tournid'))
    matchid = db.Column(db.Integer, primary_key=True)
    redcomp = db.Column(db.Integer, db.ForeignKey('competitor.compid'))
    bluecomp = db.Column(db.Integer, db.ForeignKey('competitor.compid'))
    redscore = db.Column(db.Integer)
    bluescore = db.Column(db.Integer)

class Point(db.Model):
    __tablename__ = 'point'
    pointsid = db.Column(db.Integer, primary_key=True)
    matchid = db.Column(db.Integer, db.ForeignKey('matches.matchid'))
    time = db.Column(db.String(255))
    pointscored = db.Column(db.Integer)
    compid = db.Column(db.Integer, db.ForeignKey('competitor.compid'))

class Tournament(db.Model):
    __tablename__ = 'tournament'
    tournid = db.Column(db.Integer, primary_key=True)
    tournname = db.Column(db.String(255))
    tourndate = db.Column(db.String(255))

class CompetitorSchema(ma.Schema):
    class Meta:
        fields = ('compname', 'compid', 'compage', 'compskill', 'compdiv', 'assocemail')

competitor_schema = CompetitorSchema()
competitor_schema = CompetitorSchema(many=True)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/competitors', methods=['GET'])
def all_competitors():
    all_competitors = Competitor.query.all()
    result = competitor_schema.dump(all_competitors)
    response = jsonify(result.data)
    return response

#TODO: Add in ages to all of these independent searches
#TODO: In javscript file, manipulate agemin and agemax to include edge cases
@app.route('/filtername/<name>/<agemin>/<agemax>', methods=['GET'])
def filter_name(name, agemin, agemax):
    filtered = db.session.query(Competitor).filter(Competitor.compname.like('%' + name + '%'),
                                                   Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin)).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filterexp/<exp>/<agemin>/<agemax>', methods=['GET'])
def filter_exp(exp, agemin, agemax):
    filtered = db.session.query(Competitor).filter(Competitor.compskill == exp,
                                                   Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin)).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filterage/<agemin>/<agemax>', methods=['GET'])
def filter_age(agemin, agemax):
    filtered = db.session.query(Competitor).filter(Competitor.compage <= int(agemax), Competitor.compage >= int(agemin)).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filtergender/<gender>/<agemin>/<agemax>', methods=['GET'])
def filter_gender(gender, agemin, agemax):
    filtered = db.session.query(Competitor).filter(Competitor.compdiv == gender,
                                                   Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin)).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filternameexp/<name>/<exp>/<agemin>/<agemax>', methods=['GET'])
def filter_nameexp(name, exp, agemin, agemax):
    filtered = db.session.query(Competitor).filter(Competitor.compname.like('%' + name + '%'),
                                                   Competitor.compskill == exp, Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin)).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filternamegender/<name>/<agemin>/<agemax>/<gender>', methods=['GET'])
def filter_namegender(name, agemin, agemax, gender):
    filtered = db.session.query(Competitor).filter(Competitor.compname.like('%' + name + '%'),
                                                   Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin), Competitor.compdiv == gender).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filterexpgender/<exp>/<agemin>/<agemax>/<gender>', methods=['GET'])
def filter_expgender(exp, agemin, agemax, gender):
    filtered = db.session.query(Competitor).filter(Competitor.compskill == exp, Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin), Competitor.compdiv == gender).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response

@app.route('/filterresults/<name>/<exp>/<agemin>/<agemax>/<gender>', methods=['GET'])
def filter_results(name, exp, agemin, agemax, gender):
    filtered = db.session.query(Competitor).filter(Competitor.compname.like('%' + name + '%'),
                                                   Competitor.compskill == exp, Competitor.compage <= int(agemax),
                                                   Competitor.compage >= int(agemin), Competitor.compdiv == gender).all()
    result = competitor_schema.dump(filtered)
    response = jsonify(result.data)
    return response


@app.route('/addclient', methods=['POST'])
def add_client():
    dict_body = request.get_json() #convert body to dictionary
    print(dict_body)

    new_client = Client(clientemail = dict_body['clientemail'],
                        clientphone= dict_body['clientphone'],
                        clientname = dict_body['clientname'])

    db.session.add(new_client)
    db.session.commit()

    return 'ok'

@app.route('/addcompetitor', methods=['POST'])
def add_competitor():
    dict_body = request.get_json() #convert body to dictionary
    print(dict_body)

    comp = Competitor.query.order_by(Competitor.compid.desc()).first()
    oldid = comp.compid

    print(oldid)

    new_competitor = Competitor(compname=dict_body['compname'],
                            compid= (oldid + 1),
                            compage=int(dict_body['compage']),
                            compskill=dict_body['compskill'],
                            compdiv=dict_body['compdiv'],
                            assocemail=dict_body['assocemail'])

    db.session.add(new_competitor)
    db.session.commit()

    return 'ok'



if __name__ == '__main__':
    app.run()
