[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Trusted Service Broker</h3>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contact](#contact)

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`github_username`, `repo_name`, `twitter_handle`, `email`


### Built With

* [MongoDb](https://www.mongodb.com/try/download/community)
* [Express](https://www.npmjs.com/package/express)
* [React](https://reactjs.org/)
* [Node](https://nodejs.org/en/)
* [Docker](https://docs.docker.com/get-docker/)

## Getting Started

If you have docker installed you can run the repo in containers with docker-compose.

### Prerequisites

Developed on a MERN stack, you'll require the following packages to run locally.

* node:12 
* mongodb

### Installation

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
3. cd into `acme-fe` and run `npm start` or if you have docker installed run `docker-compose up --build`
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
