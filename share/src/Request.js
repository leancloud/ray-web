const Request = (() => {

  const baseURL = "https://us-alpha-mail.leancloud.cn"

  function jsonValidator(response) {
    if (response.ok) {
      try {
        return response.json()
      } catch (error) {
        error.response = response
        throw error
      }
    } else {
      const error = new Error('Invalid status code')
      error.response = response
      throw error
    }
  }

  function fetchMessage(token) {
    const path = '/shares/' + token
    const url = new URL(path, baseURL)

    return fetch(url).then(jsonValidator)
  }

  return {
    fetchMessage
  }

})()

export default Request
