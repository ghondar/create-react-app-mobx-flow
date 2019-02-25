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

  Get = (route: string): Promise<Object> => {
    verifyRequestCancel(route)

    return this.http()
      .get(route)
      .then(res => {
        return res.data
      })
  }
}

export const { Get } = new Request('https://api.coincap.io/v2/')
