<template>
<v-container>
  <v-card max-height="650" max-width="900" >
    <a :href="article.url" target="_blank">
    <v-img
      :src="article.urlToImage"
      class="white--text align-end"
      height="250px"
    >
    </v-img>
    </a>
    <v-card-title>{{article.title}}</v-card-title>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <div class="blue--text ms-4">
          Published:&nbsp; {{article.publishedAt | formatDate}}
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{article.description}}
      </div>

      <!-- <div>{{article.content}}</div> -->
    </v-card-text>
    <!-- <v-card-subtitle class="pb-0">{{article.title}}</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>article.title</div>
    </v-card-text> -->
    <!-- <v-card-actions>
      <v-btn
            color="green darken-1"
            text
            @click="isDtls = false"
          >
            Close
          </v-btn>
    </v-card-actions> -->
  </v-card>
  </v-container>
</template>
<script>

import moment from 'moment'

export default {
    props: ['article'],
    filters: { 
      formatDate(value){
         if (value) {
           return moment(String(value)).format('MMM-DD-YYYY hh:mm:ss A')
          }
      },
   },
}
</script>