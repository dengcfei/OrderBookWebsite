import { createStore } from 'vuex'

const slugs = {
  bitcoin: 'BTC'
}

export default createStore({
  state: {
    top: [
      'BTC'
    ],
    pairs: [
      'btcusdt'
    ],
    book_tickers: {},
    book_depth: {},
    infos: {},
    metas: {
      BTC: {
        name: 'Bitcoin',
        slug: 'bitcoin',
        symbol: 'btc',
        urls: {
          website: 'https://bitcoin.org'
        },
        about: 'Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.',
        logo: require('../assets/img/btc.png')
      }
    },
    units: {
      USDT: 'Tether'
    },
    baseUnits: 'usdt'
  },
  getters: {
    getBookTickerBySlug: (state) => (slug) => {
      const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      return state.book_tickers[pair] || {}
    },
    getInfoBySlug: (state) => (slug) => {
      const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      return state.infos[pair] || {}
    },
    getBookDepthBySlug: (state) => (slug) => {
      // const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      const pair = 'btcusdt'
      return state.book_depth[pair] || {}
    }
  },
  mutations: {
    UPDATE_INFO: (state, payload) => {
      state.infos[payload.pair] = {
        ...state.infos[payload.pair],
        ...payload
      }
    },
    UPDATE_BOOK_TICKER: (state, payload) => {
      state.book_tickers[payload.pair] = {
        ...state.book_tickers[payload.pair],
        ...payload
      }
    },
    UPDATE_BOOK_DEPTH: (state, payload) => {
      state.book_depth[payload.pair] = payload.depth
    }
  },
  actions: {
  },
  modules: {
  }
})
