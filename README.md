[![LinkedIn][linkedin-shield]][linkedin-url]

# Trusted Service Broker

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contact](#contact)

## About The Project

Built on the MERN stack:

* [MongoDb](https://www.mongodb.com/try/download/community)
* [Express](https://www.npmjs.com/package/express)
* [React](https://reactjs.org/)
* [Node](https://nodejs.org/en/)
* [Docker](https://docs.docker.com/get-docker/)

## Getting Started

If you have docker installed you can run the repo in containers with docker-compose:

1. Clone the repo
```sh
git clone https://github.com/mfallon/token-broker-crud.git
```
2. cd into the project directory and run
```sh
docker-compose up --build
```
3. Use curl to generate a token with the provided payloads
```sh
curl -X POST -d @example-payload-1.json -H "Content-Type: application/json" http://localhost:8081/generate
```
4. Open the frontend on `http://localhost:1234` and paste the returned token into the 'add new claim' field

If the token is valid, it will add the invoice record to the claims list.

### Local Installation

Developed on a MERN stack, you'll require the following packages to run locally.

* node:12 & npm 
* mongodb

1. Clone the repo
```sh
git clone https://github.com/mfallon/token-broker-crud.git
```
2. Install NPM packages
```sh
cd acme-fe && npm install
cd acme-api && npm install
cd broker-api && npm install
```
3. Start all services and frontend with:
```sh
cd acme-fe
npm start
```

## Usage

1. First create a token by curl POST to the broker api on the command line using the provided example payload: `curl -X POST -d @example-payload-1.json -H "Content-Type: application/json" http://localhost:8081/generate`
2. The api will repond with a unique token. Select and copy the token to your clipboard.
3. Open the frontend through the browser: `http://localhost:1234` and hit the 'create a new claim' button. Paste the token provided above.

Tokens can only be used once.

## Contact

Mark Fallon - [LinkedIn]([linkedin-url]) - Email: markfallondub [at] gmail [dot] com

Project Link: [https://github.com/mfallon/token-broker-crud](https://github.com/mfallon/token-broker-crud)

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: http://www.linkedin.com/in/mark-fallon-dub 
[product-screenshot]: images/screenshot.png
