#!/bin/bash -x
cd vue
#perl -pi -e 's/TRAVIS_BUILD_NUMBER=(.*)/TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER/' .env
echo "TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER" >> .env
npm install
npm run build

