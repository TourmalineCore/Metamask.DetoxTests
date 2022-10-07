#!/bin/bash

# kill API
kill $(ps aux | grep 'nindao-api-service')

# kill UI
kill $(ps aux | grep 'nindao-api-tests')