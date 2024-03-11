# Speech to Text Web App

Speech to Text Web App...

## About

This is a web app that allows users to record audio and convert it to text. 
The app is built with Python / Django and React using several libraries.

## Run locally with Docker

#### 1. Clone the repository and cd into directory

```bash
$ git clone https://github.com/thascius-rumpelschnick/speech-text-web-app.git
$ cd speech-text-web-app
```
#### 2. Add .env file

Look at the .env.example file and create a .env file with the same variables.
Or see [here](./docs/todo.md) for a starter and search for Dev Environment.

#### 2. Build frontend assets

```bash
$ docker-compose run --rm node bash -c "npm i && npm run build-dev"
```
#### 3. Load Vosk model

```bash
$ docker-compose run --rm python bash -c "python manage.py load_vosk_model -m vosk-model-small-de-0.15"
```

#### 4. Start database and make migrations

```bash
$ docker-compose up -d postgres
$ docker-compose run --rm python bash -c "python manage.py migrate"
```

#### 5. Start application as whole

```bash
$ docker-compose up -d postgres python
```

#### 6. Stop application

```bash
$ docker-compose down
```

After you are done with steps 1 to 4 for the first time, you just need to run steps 5 & 6 from then on.

## Screenshots

![Dashboard](./docs/image/dashboard.png)

![Dashboard](./docs/image/edit.png)

![Dashboard](./docs/image/add.png)

![Dashboard](./docs/image/settings.png)

## Author

Florian Zapf

## Docs

1. [Development](./docs/development.md)
2. [ToDo's](./docs/todo.md)
