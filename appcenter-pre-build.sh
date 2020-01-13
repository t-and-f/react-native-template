#!/usr/bin/env bash

echo "iOS: Installing applesimutils..."
brew tap wix/brew
brew update
brew install wix/brew/applesimutils


echo "iOS: Installing detox cli..."
npm install -g detox-cli
npm install -g detox

echo "iOS: Building the project..."
detox build --configuration ios.release

echo "iOS: Cleaning cache..."
detox clean-framework-cache && detox build-framework-cache

echo "iOS: Executing tests..."
detox test --configuration ios.release --cleanup