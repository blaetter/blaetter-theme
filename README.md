# Theme for www.blaetter.de

This project contains the Drupal 8 theme for the homepage of the "Blätter für deutsche und internationale Politk". It is build with Patternlab using the particle starting project from phase2.

We extend the approach from particle to make use of docker and make the development possible in any environment.

## Contributors

Beyond the contributors for the used open source projects, there are the following maintainers working on this theme:

* [ambo](https://github.com/ambo)
* [Neuronaut2](https://github.com/Neuronaut2)

## Requirements

* Docker
* Docker-compose
* Some sort of terminal to get started

## Installation

* Clone this repository to any path, e.g. `blaetter-theme`
* Change into that directory, e.g. `cd blaetter-theme`
* Start the docker container: `docker-compose up` or `docker-compose up -d` if you don't want to be attached to the server.

## Usage

After starting the server, you can visit the patternlab installation via `http://localhost:8080/pl/`.

You can simply work within the `particle\source\` directory, make changes ans so one. The webpack server in the container will recognize any changes and reload the server and the browser window for you.


