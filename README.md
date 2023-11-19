# proto-fetch

[![build status](https://img.shields.io/github/actions/workflow/status/bergos/proto-fetch/test.yaml?branch=master)](https://github.com/bergos/proto-fetch/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/proto-fetch.svg)](https://www.npmjs.com/package/proto-fetch)

A protocol handler wrapper for fetch.

## Usage

`proto-fetch` doesn't contain any fetch implementations.
A map of protocol to implementation must be given to the constructor.
This example shows how to create a fetch for file, http and https URLs:

```javascript
import fileFetch from 'file-fetch'
import httpFetch from 'nodeify-fetch'
import protoFetch from 'proto-fetch'

const fetch = protoFetch({
  [null]: fileFetch,
  file: fileFetch,
  http: httpFetch,
  https: httpFetch
})

const res = await fetch(`file://${process.cwd()}/package.json`)
``` 
