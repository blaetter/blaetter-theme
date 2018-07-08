# Berlin.de Corporate Masterlayout

## Masterlayout für Berlin.de Rebrush »echo« ab 2016

Definition und Styleguide der Berlin.de Betreiber-Seiten mit Hilfe von [Pattern Lab](http://patternlab.io/)

### Buildprozess

* `all` – build all (patternlab and webpack) and [/export](/export/)
* `watch` – listen for changes in [/source-bundle](/source-bundle/) and build using webpack (no patternlab build)
* `clean` – Enfernen aller dynamisch erzeugten Dateien um den Build-Prozess zu erzwingen
* `distclean` – Entfernen aller dynamisch erzeugten Dateien und der für den Build-Vorgang benötigten Abhängkeiten

### Patternlab

* `php core/console --generate`
* `php core/console --export`
* `php core/console --watch`

### Docker

* [`bin/docker-build`](bin/docker-build) – build docker image using [Dockerfile](/Dockerfile)
* [`bin/docker-update-shell`](/bin/docker-update-shell) – run image, show dynamic allocated port, open shell in container

Working copy is mounted to the container by the default [docker-compose.yml](/docker-compose.yml). You have to run `make all` in the container. 

### Abhängkeiten

* composer – https://getcomposer.org/
* gnu make
* nodejs8
* php
* yarn – https://yarnpkg.com/en/
