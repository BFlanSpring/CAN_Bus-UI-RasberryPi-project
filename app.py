from flask import Flask, render_template, request, flash, redirect, url_for, jsonify, session
from sqlalchemy.exc import IntegrityError
from models import connect_db, db, User, Log 
from forms import RegisterForm, LoginForm, GaugeSelectionForm
import requests

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///JZ_log"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "Dirty30"

db.init_app(app)
connect_db(app)

is_logging_enabled = False


def get_active_link(route_name):
    return route_name if request.path == url_for(route_name) else ''

@app.route("/", methods=["GET"])
def homepage():
    """Show homepage with links to site areas."""
    return redirect("/HomeDash")

@app.route("/Home")
def home():
    """Show home page for editing and other personalization"""
    active_link = "Home"
    return render_template("home.html", active_link=active_link)



@app.route("/HomeDash", methods=["GET", "POST"])
def render_dash():
    global is_logging_enabled  # Use a global variable to track the logging state
    active_link = "HomeDash"

    if request.method == "POST":
        if "logButton" in request.form:
            # If the "Log" button was pressed, set the logging state to True and return a message
            is_logging_enabled = True
            message = "Logging is now enabled"
            return jsonify({"message": message})
        else:
            message = "Logging is now disabled"
            return jsonify({"message": message})

    return render_template("dash.html", active_link=active_link, is_logging_enabled=is_logging_enabled)



@app.route("/log-data", methods=["POST"])
def log_data():
    global is_logging_enabled
    data = request.get_json()

    if is_logging_enabled:
        try:
            log_entry = Log(**data)
            db.session.add(log_entry)
            db.session.commit()
            return jsonify({"message": "Data logged successfully"})
        except Exception as e:
            return jsonify({"error": str(e)})
    else:
        return jsonify({"message": "Logging is not enabled"})


@app.route("/update-logging", methods=["POST"])
def update_logging():
    global is_logging_enabled 

    data = request.get_json()
    is_logging_enabled = data.get("isLoggingEnabled", False)

    message = "Logging is now enabled" if is_logging_enabled else "Logging is now disabled"
    return jsonify({"message": message})




@app.route("/EditDash")
def editdash():
    """Render the signed-in user's dash"""
    return render_template("AddGauges.html")

@app.route("/Timer")
def runtimer():
    """Pull up 9-bit counter"""
    active_link = "Timer"
    return render_template("timer.html", active_link=active_link)

@app.route("/Music")
def musicplayer():
    """Render Music Player"""
    active_link = "Music"
    return render_template("music.html", active_link=active_link)

@app.route("/Weather", methods=["GET", "POST"])
def showWeather():
    if request.method == "POST":
        # Get latitude and longitude values from the form submission
        latitude = request.form.get("latitude")
        longitude = request.form.get("longitude")

        # Construct the dynamic API URL using the user's input
        api_url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,windspeed_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=3"
    else:
        # Use a default URL if there are no user inputs
        api_url = "https://api.open-meteo.com/v1/forecast?latitude=42.9&longitude=72.8&current=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,windspeed_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=3"

    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        
        # Access values from the arrays for current data
        current_temperature = data['current']['temperature_2m']
        current_relative_humidity = data['current']['relativehumidity_2m']
        current_precipitation = data['current']['precipitation']
        current_weathercode = data['current']['weathercode']
        current_windspeed = data['current']['windspeed_10m']
        current_windgusts = data['current']['windgusts_10m']
        current_soil_moisture = data['hourly']['soil_moisture_0_to_1cm'][12]
        
        hourly_data = data['hourly']
        
        hourly_data_list = []
        
        hourly_time = hourly_data['time']
        temperature_2m = hourly_data['temperature_2m']
        relativehumidity_2m = hourly_data['relativehumidity_2m']
        precipitation = hourly_data['precipitation'] 
        weathercode = hourly_data['weathercode']
        windspeed_10m = hourly_data['windspeed_10m']
        windgusts_10m = hourly_data['windgusts_10m']
        
        # Iterate through hourly data and add each hour's data to the list
        for i in range(len(hourly_time)):
            hourly_data_list.append({
                'time': hourly_time[i],
                'temperature_2m': temperature_2m[i],
                'relativehumidity_2m': relativehumidity_2m[i],
                'precipitation': precipitation[i], 
                'weathercode': weathercode[i],
                'windspeed_10m': windspeed_10m[i],
                'windgusts_10m': windgusts_10m[i]
            })

      
        for hour_data in hourly_data_list:
            print(hour_data)

        return render_template("weather.html" ,current_soil_moisture =current_soil_moisture, current_temperature=current_temperature, current_relative_humidity=current_relative_humidity, current_precipitation=current_precipitation, current_weathercode=current_weathercode, current_windspeed=current_windspeed, current_windgusts=current_windgusts, hourly_data=hourly_data_list)
    
    return "Failed to fetch data"

if __name__ == "__main__":
    app.run(debug=True)















































@app.route("/register", methods=["GET", "POST"])
def register():
    """Register a User: Display form & handle submission"""
    form = RegisterForm()

    if form.validate_on_submit():
       
        username = form.username.data
        pwd = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username, pwd, email, first_name, last_name)
        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id
        
        flash("User registered successfully!", "success")
        return redirect("/Home")

    else:
        return render_template("register.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """shows login form and processes login for on submit"""

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        pwd = form.password.data

        user = User.authenticate(username, pwd)

        if user:
            session["user_id"] = user.id
            session["username"] = user.username
            return redirect("/Dash") 
            
        else:
            form.username.errors = ["Bad name/password"]

    return render_template("login.html", form=form)


if __name__ == "__main__":
    app.run(debug=True)