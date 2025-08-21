# Authenication with google
# Content
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Librabry](#library)
* [How to get full soure code](#how_to_get_full_source_code)
* [Contributes](#contributes)
# Introduction
A demo simple project with login google and use docker basic to build.
# Technologies
Core technologies are using in this project:
* Reactjs
* Nodejs, Expressjs
* Docker
* MongoDB
# Library
Frontend:
* Style
```js
npm install @tailwindcss/vite
```
* Google
```js
  npm install @react-oauth/google
```
* Get data
```js
  npm install axios
```
* Store with redux toolkit
```js
  npm install react-redux @reduxjs/toolkit
```
Backend:
* Database with MongoDB
```js
`npm install mongoose
```
* Cookie for refresh token
```js
  npm install cookie-parser
```
* Google
```js
  npm install google-auth-library
```
* JWT token
```js
  npm install jsonwebtoken
```
* Others extends
```js
  npm install http-status-codes bcrypt cors dotenv express async-exit-hook
```
# How to get full soure code
## 1.Create folder in your pc.
## 2.Clone project:
  ```js
    git clone https://github.com/huynguyenj/Authentication-with-google-practice.git
```
## 3.Config project
### 3.1: Frontend
* Open terminal and access to folder
  ```js
    cd frontend/auth0-client
  ```
* Install library and run frontend
  ```js
    npm install
    npm run dev
  ```
* Create file .env and create variable like in .env.example to store clientID  from google provided when create credential on google cloud, server endpoint like http://localhost:3000 depend on you in this project will use that endpoint and yout PORT.
### 3.2: Backend
* Open terminal and access to folder
  ```js
    cd backend
  ```
* Install library and run backend
  ```js
    npm install
    npm start
  ```
* Create file .env to create variables like in file .env.example for test use your own MongoDB compass URI first to test, clientID and google secret from google provided when create credential on google cloud.
### 3.3: Test the project
### 4.Run project with docker
Backend .env set up
* Change MONGO_URI match to the port in docker-compose-dev.yaml at mongo set up: mongodb://mongo:27017/authDB
Run docker
* Using this command
  ```js
    #First time build or change some thing big in project like install new library or create more folder and file.
    docker-compose -f dockercompose-dev.yaml up --build
    #Next time
    docker-compose -f dockercompose-dev.yaml up
  ```
* Check docker run
    ```js
    docker ps
  ```
* Close docker
    ```js
     docker-compose -f dockercompose-dev.yaml down
  ```
# Contributes
- You can create a brance then update on your own.
- Contact to me through gmail: nguyenhuyjobs@gmail.com to inform.
  
