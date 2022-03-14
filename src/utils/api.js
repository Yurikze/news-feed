class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getItems() {
    return fetch(
      `${this.baseUrl}/newstories.json?&limitToFirst=100&orderBy="$key"`,
      {
        headers: this.headers,
      }
    ).then((res) => this._parseResponse(res));
  }

  getItem(itemId) {
    return fetch(`${this.baseUrl}/item/${itemId}.json`, {
      headers: this.headers,
    }).then((res) => this._parseResponse(res));
  }
}

const api = new Api('https://hacker-news.firebaseio.com/v0', {
  'Content-Type': 'application/json',
});

export default api;
