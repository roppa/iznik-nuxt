import BaseAPI from '@/api/BaseAPI'

export default class GiftAidAPI extends BaseAPI {
  async get() {
    const ret = await this.$get('/giftaid', {})
    return ret.giftaid
  }

  async list() {
    const ret = await this.$get('/giftaid', {
      all: true
    })

    return ret.giftaids
  }

  save({ period, fullname, homeaddress }) {
    return this.$post('/giftaid', { period, fullname, homeaddress })
  }

  edit(id, period, fullname, homeaddress, reviewed) {
    const data = {
      id,
      period,
      fullname,
      homeaddress,
      reviewed
    }
    console.log('Dat', data)
    return this.$patch('/giftaid', data)
  }

  remove() {
    return this.$del('/giftaid')
  }
}
