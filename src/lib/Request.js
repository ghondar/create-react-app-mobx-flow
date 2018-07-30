import axios from 'axios'

let _source, beforeRoute

function verifyRequestCancel(route) {
  if(beforeRoute === route) {
    if(_source !== undefined) _source.cancel('Operation canceled due to new request.')
  } else {
    beforeRoute = route
  }
}

class Request {
  url: string

  constructor(url: string) {
    this.url = url
  }

  http = function() {
    let instance = axios.create({
      baseURL: this.url,
      mode   : 'no-cors'
    })

    return instance
  }

  Get = (route: string) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.http()
        .get(route)
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }
}

export const { Get } = new Request('https://api.coinmarketcap.com/v1/')
