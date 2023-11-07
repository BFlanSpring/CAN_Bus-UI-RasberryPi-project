from flask_sqlalchemy import SQLAlchemy 
from flask_bcrypt import Bcrypt 

db = SQLAlchemy()

bcrypt = Bcrypt()

class Log(db.Model):
    """Table that will record all engine data;"""

    __tablename__ = "log"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    Engine_Temp = db.Column(db.Integer, nullable=False)

    Boost_Pressure = db.Column(db.Integer, nullable=False)

    Fuel_Pressure = db.Column(db.Integer, nullable=False)

    Oil_Pressure = db.Column(db.Integer, nullable=False)

    Oil_Temp = db.Column(db.Integer, nullable=False)

    O2 = db.Column(db.Integer, nullable=False)



class User(db.Model):
    """show users and passwords"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    username = db.Column(db.String(20), nullable=False, unique=True)

    password = db.Column(db.Text, nullable=False)

    email = db.Column(db.String(50), nullable=False, unique=True)

    first_name = db.Column(db.String(30), nullable=False)

    last_name = db.Column(db.String(30), nullable=False)


    @classmethod 
    def register(cls, username, pwd, email, first_name, last_name):
        """Regester User with hashed password and return"""

        hashed = bcrypt.generate_password_hash(pwd)
        hashed_utf8 = hashed.decode("utf8")

        return cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)

    
    @classmethod
    def authenticate(cls, username, pwd):
        """Validate that user exists and checks password       return user if valid"""

        u = User.query.filter_by(username = username).first()

        if u and bcrypt.check_password_hash(u.password, pwd):
            return u
        else: 
            return False

def connect_db(app):
    db.app = app
    with app.app_context():
        db.create_all()