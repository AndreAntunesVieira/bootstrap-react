#!/usr/bin/env bash
jest --updateSnapshot --coverage \
--collectCoverageFrom=components/**/*.js \
--collectCoverageFrom=pages/**/*.js \
--collectCoverageFrom=helpers/**/*.js \
--collectCoverageFrom=redux/**/*.js \
--collectCoverageFrom=!pages/_document.js \
--collectCoverageFrom=!pages/_app.js
