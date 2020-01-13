#!/usr/bin/env bash

echo "iOS: Installing applesimutils..."
brew tap wix/brew
brew update
brew install wix/brew/applesimutils


echo "iOS: Installing detox cli..."
yarn global add detox-cli
yarn global add detox

echo "iOS: Building the project..."
yarn detox build

echo "iOS: Cleaning cache..."
yarn detox clean-framework-cache && yarn detox build-framework-cache

echo "iOS: Executing tests..."
yarn detox test