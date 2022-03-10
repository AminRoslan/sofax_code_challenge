# sofax_code_challenge

This is my application for sofax code challenge

## Technology Stack

MERN Stack

## App Flow

1. User insert email
2. IF -> user never register, prompt to first time register.
3. ELSE -> prompt to main interface consist of user infor and appointment info.
4. User make appointment, select date, select time and save appointment.
5. Latest appointment info will appear in main interface.
6. User can resechulde appointment where old appointment will be deleted after new appointment is set.
7. User can cancel appointment.
8. User can make more than one appointment at one time.

## Limitation

No adding appointment to user Calendar.

## How to run

### Git clone

```
$ git clone https://github.com/AminRoslan/sofax_code_challenge.git

```

### Frontend

- Frontend will be running on port 3000

```
$ cd frontend
$ npm install
$ npm start

```

### Backend

- Backend will be running on port 5000
- Please connect with put your own MongoDB Host information into .env file to connect successfully. Otherwise app won't run.

```
DEV_DB_HOST=[MONGODB_HOST]
#DEV_DB_PORT=27017
DEV_DB_NAME=[MONGODB_DB_NAME]
DEV_DB_USER=[MONGODB_DB_USER]
DEV_DB_PASSWORD=[MONGODB_DB_PASSWORD]

```

```
$ cd backend
$ npm install
$ npm start

```
