import fileFetch from 'file-fetch'
import httpFetch from 'nodeify-fetch'
import protoFetch from '../index.js'

const fetch = protoFetch({
  [null]: fileFetch,
  file: fileFetch,
  http: httpFetch,
  https: httpFetch
})

async function contentLength (url) {
  const length = (await (await fetch(url)).text()).length

  console.log(`content length of ${url}: ${length}`)
}

await contentLength('package.json')
await contentLength('file:package.json')
await contentLength(`file://${process.cwd()}/package.json`)
await contentLength('https://www.unpkg.com/proto-fetch/package.json')
