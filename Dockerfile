FROM registry.berlinonline.net/library/php:apache-7.3
LABEL Name="blaetter-theme" Version="1"

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install --no-install-recommends -y \
    gnupg2 \
    git \
    unzip \
    build-essential \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxshmfence-dev \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
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
