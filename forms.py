from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SelectField,SubmitField
from wtforms.validators import InputRequired


class RegisterForm(FlaskForm):
    """Form for regestering a user"""

    username = StringField("Username", validators = [InputRequired()])
    password = PasswordField("Password", validators = [InputRequired()])
    first_name = StringField("First Name", validators = [InputRequired()])
    last_name = StringField("Last Name", validators = [InputRequired()])
    email = StringField("Email", validators = [InputRequired()])

class LoginForm(FlaskForm):
    """Form for logging in a user"""

    username = StringField ("Username", validators = [InputRequired()])
    password = StringField ("Password", validators = [InputRequired()])

class GaugeSelectionForm(FlaskForm):
    gaugeType = SelectField(
        "Choose a Gauge Type:",
        choices=[
            ("Boost_Pressure", "Boost Pressure"),
            ("Engine_Temp", "Engine Temp"),
            ("Fuel_Pressure", "Fuel Pressure"),
            ("O2", "O2 Sensor"),
            ("Oil_Pressure", "Oil Pressure"),
            ("Oil_Temp", "Oil Temp"),
        ],
        validators=[InputRequired()],
    )
    submit = SubmitField("Generate Gauge")