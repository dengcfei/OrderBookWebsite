const BASE_URL = 'wss://stream.binance.com:9443'

const subscribe = (url, callbacks) => {
  const stream = new WebSocket(url)

  for (const _event in callbacks) {
    stream.addEventListener(_event, callbacks[_event])
  }
}

export default {
  install: (app, options) => {
    const store = app.config.globalProperties.$store
    // const arithmetic = app.config.globalProperties.$arithmetic

    const channels = []
    const pairs = store.state.pairs
    for (const key in pairs) {
      channels.push(`${pairs[key]}@depth20`)
    }

    const callbacks = {
      open: () => console.log(new Date(), 'web socket@' + BASE_URL),
      close: reason => console.error(new Date(), 'disconnect', reason),
      error: reason => console.error(new Date(), 'disconnect', reason),
      message: event => {
        const response = JSON.parse(event.data)
        const [pair] = response.stream.split('@')

        // const bids = response.data.bids.map(x => {
        //   return ({ BID: x[0], SIZE: x[1], TOTAL: 0, SUM: 0 })
        // })
        // const asks = response.data.asks.map(x => {
        //   return ({ ASK: x[0], SIZE: x[1], TOTAL: 0, SUM: 0 })
        // })
        const bids = response.data.bids.map(x => {
          return ({ price: parseFloat(x[0]), amount: parseFloat(x[1]) })
        })
        const asks = response.data.asks.map(x => {
          return ({ price: parseFloat(x[0]), amount: parseFloat(x[1]) })
        })
        const bookDepth = { bids: bids, asks: asks }
        store.commit('UPDATE_BOOK_DEPTH', {
          pair: pair,
          updateId: response.data.lastUpdateId,
          depth: bookDepth
        })
      }
    }

    subscribe(`${BASE_URL}/stream?streams=${channels.join('/')}`, callbacks)
  }
}
