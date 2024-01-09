# Project Title

This project is intended to be a cost effective alternative to a digital data-logging automotive cluster. This program will display current engine data in animated gauges and allow the user to data-log in real time. On top of this primary function, this UI also has an integrated driver oriented weather app designed for making track adjustments to your vehichle. This User application should be compatable with almost any aftermarket ecu, primarily Haltech, MegaSquirt, ECUMaster and Link.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

Aftermarket car tunning has been evolving at an exponential rate as technology and sensors andvance. Automotive Software applications have always come at a cost, and their aftermarket cluster/display counter parts can cost even more than the ecu as the heart of your engine! This applications purpose is to be an open source software to decode your ECUs bit and byte data and display it on your desired screen. This application will display your prefered engine variables on JavaScript derrived gauges in real time. ALl gauges added and removed and can be edited to reflect "Normal Paramters" (green), "Warning Parameters"(yellow) and "Dangerous Parameters" (red). Depending on the current staus of the sensors input, the guage will display the value and add a corresponding color(green, yellow, red). On top of this gauge display, this Application includes an API weather base page that can be edited to diplay the vital real time weather updates at your current location. This weather page utilizes variables that arent common in average weather apps, including variables that will help auto enthusiests adjust their car at the track to current weather conditions. On top of this, this app provides a 7 segment display counter programed in CSS to help time things, like your baking... Speeding is not encouraged with this application.
For developemnt purposes I mounted a rasberryPi to the back of a $35 amazon touchscreen display, connnect your  ECU to your RasberryPi with your USB to CAN_Bus chord.


## Installation

Download this folder and save it to your desired directory. Once you have done this, it is now helpful to create your own venv environment, for many users it will look something along the lines of this -- python3 -m venv venv -- next activate the newly created enviroment and pip install the provided requirements.txt.

After all of the necessary requirements are installed, open PSQL and connect to your db server. Once you are in the psql command lines run -- \i seed.sql -- to create your db and tables for this project.

Once these have been completed, run --flask run-- in your terminal which should launch your flask application running on your local port.

## Usage

This product should be relativly user friendly, after installing the application and its necessary requirements from the github repo into your newly created directory, run flask. After flask is running, the application will load and the main selection taskbar will render, you will see multiple selections. As of now, 3 tabs have full content, the notification Bell on the far right will redirect you to the API derived weather page. This page allows a user to input any coordinates they choose and will pull up all avaiable weather data for that location all in live time.

The Tachometer button on the task bar will bring you to your instrument cluster page which will display real time data management values. Users will be able to log all current data to this apps Log database by toggling logging on and off. These vairables that can be logged are all vital values projected from the cars ECU, this includes things like RPM, Oil temp, water temp, boost pressure, Oil pressure, knock detection and many more variables. At this time, the Edit dash does not do anything. As this app developes I will add in more gauges and sensors that a user can customize to their liking.

There is also an ab 8 bit timer I created with raw JS for fun.

## Contributing
**API WEATHER SOURCE: https://api.open-meteo.com/v1/forecast?latitude=42.9&longitude=72.8&current=temperature_2m,relativehumidity_2m,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,windspeed_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=3  **

The API I used to derrive real time weather data is open-meteo.


HELP MAKE SOME CONTRIBUTIONS AND BETTER THIS APPLICATION AND GET A MENTION!

## License

Apache 2.0
