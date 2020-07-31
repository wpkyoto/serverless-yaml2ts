serverless-yaml2ts
==================

Simple convertor from serverless.yml to serverless.ts

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/serverless-yaml2ts.svg)](https://npmjs.org/package/serverless-yaml2ts)
[![Downloads/week](https://img.shields.io/npm/dw/serverless-yaml2ts.svg)](https://npmjs.org/package/serverless-yaml2ts)
[![License](https://img.shields.io/npm/l/serverless-yaml2ts.svg)](https://github.com/npm/serverless-yaml2ts/blob/master/package.json)

## Before
```yaml
service:
  name: example-project
frameworkVersion: '>=1.72.0'
custom:
  webpack:
    webpackConfig: ./webpack.config.js
    includeModules: true

plugins:
  - serverless-webpack

provider:
  name: aws
  runtime: nodejs12.x
  apiGateway:
    minimumCompressionSize: 1024
  environment:
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          method: get
          path: hello

```

### After

```typescript
import { Serverless } from 'serverless/aws';
export const service: Serverless = {
  "service": {
    "name": "example-project"
  },
  "frameworkVersion": ">=1.72.0",
  "custom": {
    "webpack": {
      "webpackConfig": "./webpack.config.js",
      "includeModules": true
    }
  },
  "plugins": [
    "serverless-webpack"
  ],
  "provider": {
    "name": "aws",
    "runtime": "nodejs12.x",
    "apiGateway": {
      "minimumCompressionSize": 1024
    },
    "environment": {
      "AWS_NODEJS_CONNECTION_REUSE_ENABLED": 1
    }
  },
  "functions": {
    "hello": {
      "handler": "handler.hello",
      "events": [
        {
          "http": {
            "method": "get",
            "path": "hello"
          }
        }
      ]
    }
  }
}

module.exports = service
```

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage


<!-- usage -->
```sh-session
$ npm install -g serverless-yaml2ts
$ sls-yaml2ts COMMAND
running command...
$ sls-yaml2ts (-v|--version|version)
serverless-yaml2ts/0.0.3 darwin-x64 node-v12.9.1
$ sls-yaml2ts --help [COMMAND]
USAGE
  $ sls-yaml2ts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
