FROM registry.gitlab.berlinonline.net/docker/php/7.1/apache:xenial
LABEL Name="patternlab-test" Version="1"

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install --no-install-recommends -y \
    gnupg2 \
    git \
    unzip \
    build-essential

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        nodejs \
        yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY docker/www/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY . /app
WORKDIR /app

ARG APP_UID="1000"
ARG APP_GID="1000"

RUN groupadd -r -f -g ${APP_GID} app \
    && useradd --no-log-init -u ${APP_UID} -g ${APP_GID} -G www-data,users -d /app app \
    && make distclean \
    && chown -R app:app /app \
    && runuser -u app -- make
