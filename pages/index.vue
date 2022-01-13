<template>
  <v-container class="pa-1">
    <div v-if="isLoading" style="height: 450px">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col
          class="text-h5 text-center deep-purple--text text--darken-2"
          cols="12"
        >
          Fetching News....please wait!
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="10"
          ></v-progress-linear>
          <!-- <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular> -->
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-item-group>
        <v-row>
          <v-col
            v-for="(article, index) in articles"
            :key="index"
            cols="12"
            md="4"
          >
            <!-- <news-details :article="article"></news-details> -->
            <v-item>
              <v-card class="mx-auto" max-width="400">
                <a :href="article.url" target="_blank">
                  <v-img
                    :src="article.urlToImage"
                    :alt="article.title"
                    class="white--text align-end"
                    height="120px"
                  >
                    <!-- <v-card-title>{{ article.publishedAt }}</v-card-title> -->
                  </v-img>
                </a>
                <!-- <v-card-subtitle class="pb-0">
                  {{ article.title }}
                </v-card-subtitle> -->
                <v-card-text >
                  <div
                    class="indigo--text md-2"
                    style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      width: 310px;
                    "
                    @mouseover="showDetails(article)"
                  >
                    {{ article.title }}
                  </div>
                  <!-- <div>Author: {{ article.author }}</div> -->
                </v-card-text>
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon v-on:click="showDetails(article)">mdi-heart</v-icon>
                  </v-btn>
                </v-card-actions> -->
                <!--  <v-card-actions>
                <v-btn text color="teal accent-4" @click="reveal = true">
                  Learn More
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%"
                >
                  <v-card-text class="pb-0">
                    <div>{{ article.description }}</div>
                  </v-card-text>
                </v-card>
              </v-expand-transition> -->
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </div>
    <v-dialog v-model="isDtls" width="750px">
      <news-details :article="articleData"></news-details>
    </v-dialog>
  </v-container>
</template>

<script>
import NewsDetails from "../components/NewsDetails.vue";

export default {
  components: { NewsDetails },
  //inject: ["myprop"],
  /*  computed: {
    newSource () {
      console.log("inside computed:",this.$store.newSource)
      return this.$store.newSource
    }
  }, */
  data: () => ({
    reveal: false,
    articles: {},
    isLoading: false,
    isDtls: false,
    articleData: null,
  }),
  computed: {
    getNewsSourceEvent: function () {
      return this.$store.state.newSource;
    },
  },
  watch: {
    getNewsSourceEvent: function (newSource) {
      //console.log("value change", newSource);
      //this.$nuxt.$loading.start();
      //alert("loading")
      this.isLoading = true;
      this.$axios
        .$get(
          //`https://newsapi.org/v2/top-headlines?sources=${newSource}&apiKey=${process.env.NUXT_ENV_API_KEY}`
          `http://localhost:8080/headlines/${newSource}`
          
        )
        .then((data) => {
          //console.log("output:",data)
          this.articles = data.articles;
          //this.$nuxt.$loading.finish();
          this.isLoading = false;
        });
    },
  },
  methods: {
    /* callAPI() {
           alert("here")
           console.log(this.searchTerm);
       } */
    showDetails(article) {
      //alert(article.title)
      this.articleData = article;
      this.isDtls = true;
      //this.isLoading=true;
    },
    hideDetails() {
      this.isDtls = false;
    },
  },
  async asyncData({ app }) {
    const { articles } = await app.$axios.$get(
      //`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.NUXT_ENV_API_KEY}`
      'http://localhost:8080/headlines/techcrunch'
    );

    return { articles };
  },
  /* mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  } */
};
</script>