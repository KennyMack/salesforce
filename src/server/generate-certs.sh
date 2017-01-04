#!/bin/bash

if [ ! -e app.js ]
then
    echo "Error: could not find main application app.js file"
    echo "You should run the generate-ssl-certs.sh script from the main MEAN application root directory"
    echo "i.e: bash scripts/generate-ssl-certs.sh"
    exit -1
fi

echo "Generating self-signed certificates..."
mkdir -p ./certificates/ssl
openssl genrsa -out ./certificates/ssl/prkey.pem 4096
openssl req -new -key ./certificates/ssl/prkey.pem -out ./certificates/ssl/pukey.pem
openssl x509 -req -days 365 -in ./certificates/ssl/pukey.pem -signkey ./certificates/ssl/prkey.pem -out ./certificates/ssl/cert.pem
# rm ./certificates/ssl/pukey.pem
chmod 600 ./certificates/ssl/prkey.pem ./certificates/ssl/cert.pem