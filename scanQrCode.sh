#!/bin/bash

QR_CODE_DIRECTORY="$HOME/Library/Android/sdk/emulator/resources"
CYPRESS_DIRECTORY="$HOME/Documents/nindao-api-tests"

# clear qrcode in resources directory
cd $QR_CODE_DIRECTORY
rm custom.png
# clear qrcode in cypress directory
cd $CYPRESS_DIRECTORY/cypress/screenshots/login.spec.cy.js
rm qrcode.png

# make qrcode screenshot by cypress
cd $CYPRESS_DIRECTORY
npx cypress run --headless --browser chrome