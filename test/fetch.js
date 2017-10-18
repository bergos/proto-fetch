/* global describe, it */

const assert = require('assert')
const protoFetch = require('..')

describe('ProtoFetch', () => {
  it('should be a constructor', () => {
    assert.equal(typeof protoFetch, 'function')
  })

  it('should reject the request if the protocol is not defined', () => {
    const fetch = protoFetch({})

    return new Promise((resolve) => {
      fetch('http://example.org/').catch(resolve)
    })
  })

  it('should use the fetch defined for the protocol', () => {
    let touched = false

    const httpFetch = (iri, options) => {
      touched = true

      return Promise.resolve({
        status: 201
      })
    }

    const fileFetch = (iri, options) => {}

    const fetch = protoFetch({
      file: fileFetch,
      http: httpFetch
    })

    return fetch('http://example.org/').then((res) => {
      assert(touched)
    })
  })
})
