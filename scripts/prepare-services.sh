#!/bin/bash

API_DIRECTORY="$HOME/Documents/nindao-api-service"
METAMASK_DIRECTORY="$HOME/metamask-mobile"

cd $API_DIRECTORY
docker-compose up -d

cd $METAMASK_DIRECTORY
npm run all-for-tests