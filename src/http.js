// eslint-disable-next-line no-unused-vars
import { connect, StreamClient } from 'getstream'
import axios from 'axios'
const API = 'https://www.localhost:8443/api/'
/**
 * @type {StreamClient | null}
 */
let streamClient = null
/**
 * @type {AxiosInstance}
 */
let http = axios.create({
  baseURL: API + 'rest/',
  timeout: 1000,
  headers: { 'X-client': 'AXIOS' }
})
/**
 * Get stream client
 * @returns {StreamClient | null}
 */
function feedClient () {
  if (streamClient) {
    return streamClient
  }
  let jwt = localStorage.getItem('jwt')
  if(jwt){
    streamClient = connect('SYSTEM', localStorage.getItem('jwt'), 'SYSTEM', { urlOverride: { api: API } })
    return streamClient
  }
  return null
}

export default http
export {
  feedClient
}