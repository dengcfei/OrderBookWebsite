const BASE_URL = 'wss://stream.binance.com:9443'

const subscribe = (url, callbacks) => {
  const stream = new WebSocket(url)

  for (const event in callbacks) {
    stream.addEventListener(event, callbacks[event])
  }
}

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store
    const arithmetic = app.config.globalProperties.$arithmetic

    const channels = []
    const pairs = store.state.pairs
    for (const key in pairs) {
      channels.push(`${pairs[key]}@bookTicker`)
    }

    const callbacks = {
      open: () => console.log(new Date(), 'web socket@' + BASE_URL),
      close: reason => console.error(new Date(), 'disconnect', reason),
      error: reason => console.error(new Date(), 'disconnect', reason),
      message: event => {
        const response = JSON.parse(event.data)
        const [pair] = response.stream.split('@')
        // const info = store.state.infos[pair] || {}
        // const priceScale = info.priceScale || 4
        const bidPrice = parseFloat(response.data.b) || 0
        const bidSize = parseFloat(response.data.B) || 0
        const askPrice = parseFloat(response.data.a) || 0
        const askSize = parseFloat(response.data.A) || 0

        store.commit('UPDATE_BOOK_TICKER', {
          pair: pair,
          updateId: response.data.u,
          BID: bidPrice,
          BID_SIZE: bidSize,
          ASK: askPrice,
          ASK_SIZE: askSize
        })
      }
    }

    subscribe(`${BASE_URL}/stream?streams=${channels.join('/')}`, callbacks)
  }
}
