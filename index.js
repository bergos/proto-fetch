async function fetch (url, options) {
  let protocol = null

  if (/^[a-z]+:/.test(url)) {
    protocol = new URL(url).protocol.slice(0, -1)
  }

  if (protocol in this.protocols) {
    return this.protocols[protocol](url, options)
  }

  throw new Error(`unknown protocol: ${protocol}`)
}

function factory (protocols) {
  const instance = (url, options) => {
    return fetch.call(instance, url, options)
  }

  instance.protocols = protocols

  return instance
}

export default factory
