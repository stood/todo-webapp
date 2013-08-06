#!/bin/bash

set -e

pids=()

trap 'kill ${pids[@]} 2> /dev/null' EXIT

Xvfb :99 -screen 0 1024x768x8 2> /dev/null &
pids+=($!)

wget -q http://selenium.googlecode.com/files/selenium-server-standalone-2.31.0.jar -O selenium.jar
DISPLAY=:99.0 java -jar selenium.jar > /dev/null &
sleep 10
pids+=($!)

if [[ ! -d api ]];
then
    git clone git://github.com/sanpii/todo-rest.git api
    cd api
    ./sismo.sh
    php -S localhost:8080 -t web/ web/app.php 2> /dev/null &
    pids+=($!)
    cd ..
fi

wget -q http://getcomposer.org/installer -O - | php;
./composer.phar install --dev;
cp behat.yml{-dist,}
cp web/js/config/{development,current}.js

php -S localhost:8081 -t web 2> /dev/null &
pids+=($!)

./bin/behat -fprogress
