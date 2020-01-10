#!/usr/bin/env bash

echo "iOS: Installing applesimutils..."
brew tap wix/brew
brew install wix/brew/applesimutils

echo "iOS: Installing detox cli..."
npm install -g detox-cli

echo "iOS: Building the project..."
yarn detox build

echo "iOS: Cleaning cache..."
yarn detox clean-framework-cache && yarn detox build-framework-cache

echo "iOS: Executing tests..."
yarn detox test