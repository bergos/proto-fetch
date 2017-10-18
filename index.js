const url = require('url')

function fetch (iri, options) {
  const protocol = url.parse(iri).protocol.split(':').shift()

  if (protocol in this.protocols) {
    return this.protocols[protocol](iri, options)
  }

  return Promise.reject(new Error('unknown protocol'))
}

function factory (protocols) {
  const instance = (iri, options) => {
    return fetch.call(instance, iri, options)
  }

  instance.protocols = protocols

  return instance
}

module.exports = factory
