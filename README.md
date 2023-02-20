# Event App

This is a simple event app built using React JS and Node JS. The app allows users to create, retrieve, update and delete events. The app is built using the following technologies:

* [Node.js](https://nodejs.org/en/) - The JavaScript runtime used
* [Express](https://expressjs.com/) - The web framework used
* [React](https://reactjs.org/) - The JavaScript library used
* [MySQL](https://www.mysql.com/) - The database used
* [Sequelize](https://sequelize.org/) - The ORM used
* [Docker](https://www.docker.com/) - The containerization platform used
* [Docker Compose](https://docs.docker.com/compose/) - The tool for defining and running multi-container Docker applications
* [Sequelize](https://sequelize.org/) - The ORM used
* [Mocha](https://mochajs.org/) - The testing framework used
* [Chai](https://www.chaijs.com/) - The assertion library used
* [ChaiHttp](https://www.chaijs.com/plugins/chai-http/) - The HTTP integration testing plugin for Chai
* [Nodemon](https://nodemon.io/) - The development dependency used to automatically restart the server on file changes
* [ESLint](https://eslint.org/) - The linter used
* [Prettier](https://prettier.io/) - The code formatter used

## Getting Started

### Prerequisites

- Docker
- Docker Composer
- Node JS
- React JS
- NPM
- MySQL
- Git

### Installation

Clone the repository

```bash
git clone git@github.com:tanvirrb/event-app.git
```

Change directory to the project root

```bash
cd event-app
```

create environment variable file from example file

```bash
cp .env.example .env
```

Start the app

```bash
npm run docker:up
```

Docker will handle the rest. From spinning up the containers to installing the dependencies and running the app. sometimes it might take a while to install the dependencies. So be patient. Wait for the message in terminal to display the following message:

```
 webpack compiled successfully
```
This means the app is ready to be used.

The app REST API will be available at http://localhost:3000/v1/events

The app frontend will be available at http://localhost:3001

The OpenApi documentation will be available at http://localhost:3000/v1/api-docs

The Postman collection will be available at my Github gist [here](https://gist.github.com/tanvirrb/ff4928661b79a607bbb8ce4d00c561ad)

## Troubleshooting
Sometimes the app might not be available at the above URLs. In that case, you can check the logs of the containers to see what's going on. If any error occurs, try closing the docker compose by pressing `Ctrl + C` or  `Ctrl + Z` or any other key combination that works on your terminal. Then run the clean up command:
    
```bash
npm run docker:down
```

Then rebuild the app by running the following command:

```bash
npm run docker:rebuild
```

Then start the app again by running the following command:

```bash
npm run docker:up
```


## Event REST API

The Event REST API is an API for managing events. It allows users to create, retrieve, update and delete events. The API is built using Node.js and Express JS in the backend, and MySQL for data storage.

#### Base URL for the API http://localhost:3000/v1
### API Endpoints

### `GET /events?pageNumber=1&pageSize=5`

Retrieves a list of all events.

Request Parameters

| Parameter    |In | Type   | Required | Description         |
| ------------ |---|--------|----------| ------------------- |
| pageNumber   | query | number | yes      | The page number of the events. |
| pageSize     | query | number | yes        | The number of events per page. |


#### Response

```json
{
  "pageNumber": "1",
  "pageSize": "5",
  "totalEvents": 3,
  "data": [
    {
      "id": 3,
      "name": "Birthday Party",
      "location": "Bangladesh",
      "date": "2023-02-26T00:00:00.000Z",
      "createdAt": "2023-02-20T08:22:23.000Z",
      "updatedAt": "2023-02-20T08:22:23.000Z"
    },
    {
      "id": 2,
      "name": "Football Match",
      "location": "Brazil",
      "date": "2023-02-22T00:00:00.000Z",
      "createdAt": "2023-02-20T08:21:22.000Z",
      "updatedAt": "2023-02-20T08:21:22.000Z"
    },
    {
      "id": 1,
      "name": "Test Event",
      "location": "Bangladesh",
      "date": "2023-02-07T00:00:00.000Z",
      "createdAt": "2023-02-20T08:20:41.000Z",
      "updatedAt": "2023-02-20T08:20:41.000Z"
    }
  ]
}

```

### `GET /events/:id`
Retrieves a specific event by ID. 

Request Parameters

| Parameter | In |Type   | Required | Description         |
| --------- |---|--------| -------- | ------------------- |
| id        | route param | number | yes      | The ID of the event. |

#### Response

```json
{
  "data": {
    "id": 1,
    "name": "Test Event",
    "location": "Bangladesh",
    "date": "2023-02-07T00:00:00.000Z",
    "updatedAt": "2023-02-20T08:20:41.349Z",
    "createdAt": "2023-02-20T08:20:41.349Z"
  }
}
```

### `POST /events`
Creates a new event.

Request Parameters

| Parameter | In          | Type   | Required | Description         |
| --------- |-------------|--------| -------- | ------------------- |
| name      | body        | string | yes     | The name of the event. |
| location  | body        | string | yes     | The location of the event. |
| date      | body        | string | yes     | The date of the event. |
Request Body
```json
{
  "name": "Birthday Party",
  "location": "Bangladesh",
  "date": "2023-02-20"
}
```

#### Response

```json
{
  "data": {
    "id": 1,
    "name": "Test Event",
    "location": "Bangladesh",
    "date": "2023-02-07T00:00:00.000Z",
    "updatedAt": "2023-02-20T08:20:41.349Z",
    "createdAt": "2023-02-20T08:20:41.349Z"
  }
}
```

### `PUT /events/:id`
Updates an existing event.

Request Parameters

| Parameter | In          | Type   | Required | Description         |
| --------- |-------------|--------| -------- | ------------------- |
| id        | route param | number | yes      | The ID of the event. |
| name      | body        | string | no     | The name of the event. |
| location  | body        | string | no     | The location of the event. |
| date      | body        | string | no     | The date of the event. |

Request Body
```json
{
  "name": "Football Match",
  "location": "Brazil",
  "date": "2023-02-22"
}
```

#### Response

```json
{
  "data": {
    "id": 1,
    "name": "Football Match",
    "location": "Brazil",
    "date": "2023-02-22T00:00:00.000Z",
    "updatedAt": "2023-02-22T08:20:41.349Z",
    "createdAt": "2023-02-22T08:20:41.349Z"
  }
}
```

### `DELETE /events/:id`

Deletes an existing event.

Request Parameters

| Parameter | In |Type   | Required | Description         |
| --------- |---|--------| -------- | ------------------- |
| id        | route param | number | yes      | The ID of the event. |

#### Response

```json
{
  "data": true
}
```


### Running the tests

```bash
npm run test:docker
```

## Troubleshooting
Sometimes the tests might fail due to the database connection. If that happens, close the docker compose by pressing `Ctrl + C` or  `Ctrl + Z` or any other key combination that works on your terminal. Then run the clean up command:

```bash
npm run posttest:docker
```

build the docker compose for test: 

```bash
npm run test:docker:rebuild
```

Then run the tests again:

```bash
npm run test:docker
```


# Conclusion

Thanks for reading this documentation. If you have any questions, feel free to reach out to me at [My Email](mailto:tanvir.fallen@gmail.com)

