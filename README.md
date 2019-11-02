# Blaetter.de

## Masterlayout für Blaetter.de

Definition und Styleguide von Blaetter.de mit Hilfe von [Pattern Lab](http://patternlab.io/)

### Buildprozess

* `all` – build all (patternlab and webpack) and [/export](/export/)
* `watch` – listen for changes in [/source-bundle](/source-bundle/) and build using webpack (no patternlab build)
* `clean` – Enfernen aller dynamisch erzeugten Dateien um den Build-Prozess zu erzwingen
* `distclean` – Entfernen aller dynamisch erzeugten Dateien und der für den Build-Vorgang benötigten Abhängkeiten

### Docker

* [`bin/docker-build`](bin/docker-build) – build docker image using [Dockerfile](/Dockerfile) - needs to be executed at least once after checking out
* [`bin/docker-update-shell`](/bin/docker-update-shell) – run image, show dynamic allocated port, open shell in container

### In den Container gehen
* @see [`bin/docker-update-shell`](/bin/docker-update-shell)

Working copy is mounted to the container by the default [docker-compose.yml](/docker-compose.yml). You have to run `make all` in the container.

### Abhängkeiten

* composer – https://getcomposer.org/
* gnu make
* nodejs8
* php
* yarn – https://yarnpkg.com/en/
