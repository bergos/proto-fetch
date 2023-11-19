import { rejects, strictEqual } from 'node:assert'
import { describe, it } from 'mocha'
import protoFetch from '../index.js'

describe('proto-fetch', () => {
  it('should be a factory', () => {
    strictEqual(typeof protoFetch, 'function')
  })

  it('should reject the request if the protocol is unknown', async () => {
    const fetch = protoFetch({})

    await rejects(fetch('http://example.org/'))
  })

  it('should use the fetch implementation for the protocol in the given URL', async () => {
    let touched

    const fileFetch = () => {}

    const httpFetch = () => {
      touched = true
    }

    const fetch = protoFetch({
      file: fileFetch,
      http: httpFetch
    })

    await fetch('http://example.org/')

    strictEqual(touched, true)
  })

  it('should use the default fetch implementation for relative URLs', async () => {
    let touched

    const defaultFetch = () => {
      touched = true
    }

    const fileFetch = () => {}

    const fetch = protoFetch({
      [null]: defaultFetch,
      file: fileFetch
    })

    await fetch('/')

    strictEqual(touched, true)
  })

  it('should forward the url arguments', async () => {
    let actualUrl

    const url = 'http://example.org/'

    const httpFetch = url => {
      actualUrl = url
    }

    const fetch = protoFetch({
      http: httpFetch
    })

    await fetch(url)

    strictEqual(actualUrl, url)
  })

  it('should forward the options argument', async () => {
    let actualOptions

    const options = {}

    const httpFetch = (url, options) => {
      actualOptions = options
    }

    const fetch = protoFetch({
      http: httpFetch
    })

    await fetch('http://example.org/', options)

    strictEqual(actualOptions, options)
  })

  it('should support URIs', async () => {
    let actualUri

    const url = 'file:package.json'

    const fileFetch = (url, options) => {
      actualUri = url
    }

    const fetch = protoFetch({
      file: fileFetch
    })

    await fetch(url)

    strictEqual(actualUri, url)
  })

  it('should forward the return value', async () => {
    const res = {}

    const httpFetch = () => res

    const fetch = protoFetch({
      http: httpFetch
    })

    const result = await fetch('http://example.org/')

    strictEqual(result, res)
  })
})
