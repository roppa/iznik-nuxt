<template>
  <div>
    <NewsUserIntro
      v-if="userid"
      :userid="userid"
      :users="users"
      :newsfeed="newsfeed"
      append="put up a poster"
      :append-bold="info.title"
    />
    <p>To help Freegle, <b>{{ users[userid].displayname }}</b> printed a Freegle poster and put it up where people can see it.</p>
    <notice-message v-if="info.description || info.name" class="prewrap">
      <b v-if="info.name">"{{ info.name.trim() }}"</b>
      <br v-if="info.name && info.description">
      <em v-if="info.description">"{{ info.description.trim() }}"</em>
    </notice-message>
    <p class="mt-1">
      <b>We need your help to get more people freegling</b>.  Could you put one up too?
    </p>
    <l-map
      ref="map"
      :zoom="14"
      :center="[info.lat, info.lng]"
      :style="'width: 100%; height: 200px'"
    >
      <l-tile-layer :url="osmtile" :attribution="attribution" />
      <l-marker :lat-lng="[info.lat, info.lng]" :interactive="false" />
    </l-map>
    <div class="mt-2 d-flex flex-wrap justify-content-between">
      <NewsLoveComment :newsfeed="newsfeed" @focus-comment="$emit('focus-comment')" />
      <nuxt-link to="/spread">
        <b-btn
          variant="secondary"
          size="sm"
          class="d-inline-block"
          @click="share"
        >
          <v-icon name="bullhorn" /> Put up a poster
        </b-btn>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import twem from '~/assets/js/twem'
import NewsBase from '~/components/NewsBase'
import NewsUserIntro from '~/components/NewsUserIntro'
import NewsLoveComment from '~/components/NewsLoveComment'
import NoticeMessage from '~/components/NoticeMessage'
import map from '@/mixins/map.js'

export default {
  components: {
    NewsUserIntro,
    NewsLoveComment,
    NoticeMessage
  },
  extends: NewsBase,
  mixins: [map],
  computed: {
    info() {
      let info = {}
      try {
        info = JSON.parse(this.newsfeed.message)

        if (info.description) {
          const desc = twem.twem(this.$twemoji, info.description)
          info.description = desc
        }
      } catch (e) {
        console.log('Invalid noticeboard', this.newsfeed)
      }

      return info
    }
  }
}
</script>
