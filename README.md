# Blaetter.de

## Masterlayout für Blaetter.de

Definition und Styleguide von Blaetter.de mit Hilfe von [Pattern Lab](http://patternlab.io/)

### Buildprozess

* `all` – build all (patternlab and webpack) and [/export](/export/), then `colors-check`
* `colors-check` – check the colours of the built palm.css against blaetter-design
* `watch` – listen for changes in [/source-bundle](/source-bundle/) and build using webpack (no patternlab build)
* `clean` – Enfernen aller dynamisch erzeugten Dateien um den Build-Prozess zu erzwingen
* `distclean` – Entfernen aller dynamisch erzeugten Dateien und der für den Build-Vorgang benötigten Abhängkeiten

### Colours

All colours come from the repository [blaetter-design](https://github.com/blaetter/blaetter-design) (`tokens.json` is the only source). `source-bundle/scss/00-global/00-blaetter-tokens.scss` is a verbatim copy of its `dist/tokens.scss` (do not edit; update it with `./design copies --update` in blaetter-design). `01-settings.scss` only points its variables to it; write no colour values in the Sass sources. `make colors-check` (part of `make all`, in the container) fails when the built `palm.css` contains a colour that is neither a token nor one of the exceptions in `bin/colors-check.php` (share buttons; black and white or a token with opacity are allowed). Grey text is `$muted` (#6B6B6B); `$greyLight` (#808080) is for borders of controls only.

### Docker

* [`bin/docker-build`](bin/docker-build) – build docker image using [Dockerfile](/Dockerfile) - needs to be executed at least once after checking out
* [`bin/docker-update-shell`](/bin/docker-update-shell) – run image, show dynamic allocated port (bound to 127.0.0.1 only), open shell in container

### In den Container gehen
* @see [`bin/docker-update-shell`](/bin/docker-update-shell)

Working copy is mounted to the container by the default [docker-compose.yml](/docker-compose.yml). You have to run `make all` in the container.

### Abhängkeiten

* composer – https://getcomposer.org/
* gnu make
* nodejs8
* php
* yarn – https://yarnpkg.com/en/
