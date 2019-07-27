#!/bin/bash
cd vue
perl -pi -e 's/TRAVIS_BUILD_NUMBER=(.*)/TRAVIS_BUILD_NUMBER=8888/' .env
npm install
npm run build

