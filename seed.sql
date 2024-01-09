DROP DATABASE IF EXISTS JZ_log;

CREATE DATABASE JZ_log;

\c JZ_log;

DROP TABLE IF EXISTS log;
DROP TABLE IF EXISTS users;

CREATE TABLE log (
    id SERIAL PRIMARY KEY,
    Engine_Temp INTEGER NOT NULL,
    Boost_Pressure INTEGER NOT NULL,
    Fuel_Pressure INTEGER NOT NULL,
    Oil_Pressure INTEGER NOT NULL,
    Oil_Temp INTEGER NOT NULL,
    O2 INTEGER NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL
);
