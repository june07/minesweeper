#!/bin/bash -x
cd vue
#perl -pi -e 's/TRAVIS_BUILD_NUMBER=(.*)/TRAVIS_BUILD_NUMBER=$TRAVIS_BUILD_NUMBER/' .env
echo "VERSION=$(grep "\"version\"" package.json | cut -f2 -d":" | cut -f2 -d"\"")" >> .env
cat .env
npm install
npm run build