# QuickShop API Gateway Setup

This guide will help you set up the QuickShop API Gateway. We'll install some dependencies, set up the project structure, and add scripts to generate protobuf files.

## Installing Dependencies

First, we need to install some dependencies. Run the following command in your terminal:

```bash
npm i @nestjs/microservices @grpc/grpc-js @grpc/proto-loader

npm i -D @types/node ts-proto
```

## Project Structure

Next, we'll create the final folder and file structure. We'll create a single module for simplicity. Run the following commands:

```bash
nest g mo auth && nest g co auth --no-spec && nest g s auth --no-spec

nest g mo product && nest g co product --no-spec

nest g mo order && nest g co order --no-spec

touch src/auth/auth.guard.ts
```

## Adding Scripts

We need to add some scripts to our `package.json` file to generate our protobuf files based on the shared proto project we just completed. Add the following lines of code inside the scripts property of our `package.json` file:

Replace `YOUR_USERNAME` with your Github username.

```json
"proto:install": "npm i git+https://github.com/YOUR_USERNAME/quickshop-shared-proto.git",
"proto:auth": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./node_modules/quickshop-shared-proto/proto --ts_proto_out=src/auth/ node_modules/quickshop-shared-proto/proto/auth.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
"proto:order": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./node_modules/quickshop-shared-proto/proto --ts_proto_out=src/order/ node_modules/quickshop-shared-proto/proto/order.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
"proto:product": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./node_modules/quickshop-shared-proto/proto --ts_proto_out=src/product/ node_modules/quickshop-shared-proto/proto/product.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
"proto:all": "npm run proto:auth && npm run proto:order && npm run proto:product"
```

## Install Protobuf Compiler (protoc)

If you don't have protoc installed in your system, follow these steps:

- For Linux: Use a package manager like `apt` or `yum`. For example: `sudo apt install protobuf-compiler`.
- For macOS: Use Homebrew with `brew install protobuf`.
- For Windows: Download the pre-built binaries from the [Protobuf GitHub Releases](https://github.com/protocolbuffers/protobuf/releases) page and add the executable to your PATH.

Verify the installation by running `protoc --version` in your terminal. It should return the version of protoc.

## Run the Scripts

Finally, let's run these scripts:

```bash
npm run proto:install && npm run proto:all
```

This will install the shared proto project and generate the protobuf files.
