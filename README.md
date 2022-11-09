# invoice-mysql
dockerized node server running mysql db


## Steps to run this node server:

# Download Docker

Instructions for download using Mac, Windows, and Linux:
https://docs.docker.com/get-docker/

# Run docker compose

```docker compose up -d```

Docker will have installed all of the necessary components to the container and expose ports to interact with.

Navigate to http://0.0.0.0:6868/ in browser to check health of the server

```{"message":"invoicer db OK"}```
