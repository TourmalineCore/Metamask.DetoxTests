#!/bin/bash
APITEST_DIRECTORY="$HOME/Documents/nindao-api-tests"

DOWNLOADS_DIRECTORY="$APITEST_DIRECTORY/cypress/downloads"
TEST_DIRECTORY="$APITEST_DIRECTORY/test"
#clear
cd $DOWNLOADS_DIRECTORY
mv sessionData.txt $TEST_DIRECTORY

cd $APITEST_DIRECTORY 
npm test