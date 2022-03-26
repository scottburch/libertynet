# https://hub.docker.com/_/golang
FROM golang:1.17.3-bullseye AS build

ARG BUILD_TAGS=builtin_static,rocksdb

LABEL org.label-schema.description="HORNET - The IOTA community node"
LABEL org.label-schema.name="gohornet/hornet"
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.vcs-url="https://github.com/gohornet/hornet"
LABEL org.label-schema.usage="https://github.com/gohornet/hornet/blob/main/documentation/docs/getting_started/using_docker.md"

# Ensure ca-certificates are up to date
RUN update-ca-certificates



# Set the current Working Directory inside the container
#RUN mkdir /app
#WORKDIR /app

# Use Go Modules
#COPY go.mod .
#COPY go.sum .

RUN git clone https://github.com/gohornet/hornet.git /app
WORKDIR /app

RUN git checkout mainnet

ENV GO111MODULE=on
RUN go mod download
RUN go mod verify


#COPY . .

# Build the binary
RUN go build \
      -tags="$BUILD_TAGS" \
      -ldflags='-w -s' -a \
      -o /go/bin/hornet

############################
# Image
############################
# https://console.cloud.google.com/gcr/images/distroless/global/cc-debian11
# using distroless cc "nonroot" image, which includes everything in the base image (glibc, libssl and openssl)
FROM ubuntu
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install vim -y
RUN apt-get install net-tools -y
RUN apt-get install wget -y
#gcr.io/distroless/cc-debian11:nonroot

EXPOSE 15600/tcp
EXPOSE 14626/udp
EXPOSE 14265/tcp
EXPOSE 8081/tcp
EXPOSE 8091/tcp
EXPOSE 1883/tcp

# Copy the binary into distroless image
COPY --from=build /go/bin/hornet /app/hornet


# Copy the assets
COPY ./config.json /app/config.json
COPY ./config_devnet.json /app/config_devnet.json
COPY ./config_comnet.json /app/config_comnet.json
COPY ./peering.json /app/peering.json
COPY ./profiles.json /app/profiles.json

WORKDIR /app
#USER nonroot
#RUN chown -R nonroot:nonroot /app

ENTRYPOINT ["/app/hornet"]
