# proto-fetch

A protocol handler wrapper for fetch.

## Usage

`proto-fetch` doesn't contain any fetch implementations.
A map of protocol to implementation must be given to the constructor.
This example shows how to create a fetch for file, http and https URLs:

```
const fileFetch = require('file-fetch')
const httpFetch = require('nodeify-fetch')
const protoFetch = require('proto-fetch')

const fetch = protoFetch({
  file: fileFetch,
  http: httpFetch,
  https: httpFetch
})

``` 
