#!/bin/bash

set -e

pids=()

trap 'kill ${pids[@]} 2> /dev/null' EXIT

Xvfb :99 -screen 0 1024x768x8 2> /dev/null &
pids+=($!)

wget -q http://selenium.googlecode.com/files/selenium-server-standalone-2.37.0.jar -O selenium.jar
DISPLAY=:99.0 java -jar selenium.jar > /dev/null &
sleep 10
pids+=($!)

wget -q http://getcomposer.org/installer -O - | php;

# {{{ Install API
if [[ ! -d api ]];
then
    git clone git://github.com/sanpii/todo-rest.git api
fi

cd api
git pull origin master
cp app/config/parameters.yml{.dist,}
../composer.phar install
echo '(A) Crack the Da Vinci Code.
(B) +winning Win.
@context Give it some context.
Just a POD: Plain old task.
(C) +project @context This one has it all!
(C) 2012-02-03 This one has a date!
(B) 2012-03-04 +project @context This one has a date and a context AND a project!
x 2012-04-03 This one has no priority and a date.' > app/todo.txt
php -S localhost:8080 -t web/ web/app.php 2> /dev/null &
pids+=($!)
cd ..
# }}}

./composer.phar install --dev;
bower install
cp behat.yml{-dist,}
cp web/js/config/{development,current}.js

php -S localhost:8081 -t web 2> /dev/null &
pids+=($!)

./bin/behat -fprogress
