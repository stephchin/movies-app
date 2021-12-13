# README

This application requires the following to be installed:
* ruby/rails
* postgres
* yarn
* node

The following environment varialbles must be set in your .env to run the application:
* MOVIES_DB_API_KEY

Steps to run the application:
```
cp example.env .env
# update the api key in your .env

bundle install
yarn install
rails start
```
