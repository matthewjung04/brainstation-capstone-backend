# TimeZest - Backend

## Acknowledgements
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Brainstation](https://brainstation.io/)
- [Figma](https://www.figma.com/design/)
- [Freepik](https://www.freepik.com/)
- [Google](https://fonts.google.com/)
- [npm](https://www.npmjs.com/)
- [Postman](https://www.postman.com/)
- [StackBlitz](https://stackblitz.com/edit/react-fu7pbk?file=src%2FApp.js)
- [Thunder Client](https://www.thunderclient.com/)
- [Vite](https://vitejs.dev/)
- [VistaPrint](https://www.vistaprint.ca)

## Author
- [Matthew Jung](https://github.com/matthewjung04)

## Table of Contents
- [Usage](#usage-run-all-commands-from-main-directory)
- [Overview](#overview)
- [Problem](#problem)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [APIs](#apis)
- [Endpoints](#endpoints)
- [Mockups](#mockups)
- [Nice-to-haves](#nice-to-haves)

## Usage (run all commands from main directory)
- Install project:
`$ npm install`

- Run the project:
`$ npm run dev`

## Overview
TaskMaster strives to make scheduling anything from daily tasks to important work events easier with the power of AI.
This project uses mongoDB GenAI to create suggestions to make scheduling anything from simple daily tasks to important work meetings.

## Problem
Time management can be difficult with a heavy schedule filled with meetings and tasks that isn't organized properly.
For users that struggle with time management modern AI technology can do the planning for you.

## Features
- Automated scheduling: Create schedules for users based on previous tasks and preferences.
- Automated reminders: Get reminders of upcoming meets and tasks without having to setup reminders manually.

## Tech Stack
![javascript][javascript-image] [![npm][npm-image]][npm-url] [![expressjs][expressjs-image]][expressjs-url] [![nodejs][nodejs-image]][nodejs-url] [![mongodb][mongodb-image]][mongodb-url] 

[javascript-image]: https://img.shields.io/badge/JavaScript-HTML-orange
[axios-image]: https://img.shields.io/badge/axios-api-purple
[axios-url]: https://axios-http.com/docs/api_intro
[expressjs-image]: https://img.shields.io/badge/Express.js-framework-white
[expressjs-url]: https://expressjs.com/
[mongodb-image]: https://img.shields.io/badge/mongoDB-database-lime
[mongodb-url]: https://www.mongodb.com/
[nodejs-image]: https://img.shields.io/badge/Node.js-backend-green
[nodejs-url]: https://nodejs.org/en
[npm-image]: https://img.shields.io/badge/npm-v10.8.1-red
[npm-url]: https://www.npmjs.com/
[react-image]: https://img.shields.io/badge/react-vite-blue
[react-url]: https://react.dev/
[sass-image]: https://img.shields.io/badge/Sass-css-pink
[sass-url]: https://sass-lang.com/

**npm libraries**
- [axios](https://www.npmjs.com/package/axios): `$ npm i axios`
- [cors](https://www.npmjs.com/package/cors): `$ npm i cors`
- [dotenv](https://www.npmjs.com/package/dotenv): `$ npm i dotenv`
- [express](https://www.npmjs.com/package/express): `$ npm i express`
- [express-async-handler](https://www.npmjs.com/package/express-async-handler): `$ npm i express-async-handler`
- [joi](https://www.npmjs.com/package/joi): `$ npm i joi`
- [json-calendar](https://www.npmjs.com/package/json-calendar): `$ npm i json-calendar`
- [mongodb](https://www.npmjs.com/package/mongodb): `$ npm i mongodb`
- [nodemon](https://www.npmjs.com/package/nodemon): `$ npm i -g nodemon`
- [object-assign](https://www.npmjs.com/package/object-assign): `$ npm i object-assign`
- [uuid](https://www.npmjs.com/package/uuid): `$ npm i uuid`
- [winston](https://www.npmjs.com/package/winston): `$ npm i winston`

## APIs
- No External APIs for initial phase of the project

## Endpoints
**GET users/:id**
- Get list of schedules for given id

Response Body:
```
{
  "id": 1,
  "name": "TaskMaster",
  "event": [
    {
      "event": "project deadline",
      "start": "November 6, 2024 4:00pm",
      "end": "No",
      "repeat": "No"
    }
  ]
}
```

**POST users/:id**
- Users can add new a scedule

Request Body:
```
{
  "name": "TaskMaster",
  "event": [
    {
      "id": 2,
      "event": "project meeting",
      "start": "November 6, 2024 4:00pm",
      "end": "November 6, 2024 6:00pm",
      "repeat": "Weekly"
    }
  ]
}
```

Response Body:
```
{
  "id": 1,
  "name": "TaskMaster",
  "event": [
    {
      "id": 1,
      "event": "project deadline",
      "start": "November 6, 2024 4:00pm",
      "end": "No",
      "repeat": "No"
    },
    {
      "id": 2,
      "event": "project meeting",
      "start": "November 6, 2024 4:00pm",
      "end": "November 6, 2024 6:00pm",
      "repeat": "Weekly"
    }
  ]
}
```

**PUT /users:id/events/:event_id**
- Users can edit an existing scedule

Request Body:
```
{
  "name": "TaskMaster",
  "event": [
    {
      "id": 2,
      "event": "project meeting",
      "start": "November 6, 2024 4:00pm",
      "end": "November 6, 2024 6:30pm",
      "repeat": "monthly"
    }
  ]
}
```

Response Body:
```
{
  "id": 1,
  "name": "TaskMaster",
  "event": [
    {
      "id": 2,
      "event": "project meeting",
      "start": "November 6, 2024 4:00pm",
      "end": "November 6, 2024 6:30pm",
      "repeat": "monthly"
    }
  ]
}
```

**DELETE /users:id/events/:event_id**
- Users can delete an existing scedule

Request Body:
```
{
  "name": "TaskMaster",
  "event": [
    {
      "id": 1
      "event": "project deadline",
      "start": "November 6, 2024 4:00pm",
      "end": "No",
      "repeat": "No"
    }
  ]
}
```

Response Body:
```
{
  "id": 1,
  "name": "TaskMaster",
  "event": [
    {
      "id": 2,
      "event": "project meeting",
      "start": "November 6, 2024 4:00pm",
      "end": "November 6, 2024 6:00pm",
      "repeat": "Weekly"
    }
  ]
}
```

## Nice-to-haves
- Integrate Google Calendars, Apple Calendars, Slack
  - export calendars and events
- Bonus document translation feature
- Expand automated scheduling with voice commands