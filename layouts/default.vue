<template>
  <v-app style="background-color:#ECEFF1">
    <v-app-bar
      dark
      fixed
      app
      prominent
      shrink-on-scroll
      color="#43a047"
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-threshold="350"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-toolbar-title
        ><span class="headline">NEWs Vault.</span>&nbsp;<span class="subtitle-1"
          >Pit STOP! for all your information, stay updated...</span
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-col class="d-flex" cols="12" sm="3">
        <v-select
          :items="items"
          label="News Source"
          dense
          outlined
          @change="getSource"
          v-model="news_source"
          item-text="name"
          item-value="id"
        ></v-select>
      </v-col>
      <!--  <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      //clipped: false,
      /* items: [
        "cnn",
        "techcrunch",
        "bbc-news",
        "al-jazeera-english",
        "ansa",
        "bloomberg",
        "buzzfeed",
      ], */
      items:[],
      news_source: "",
    };
  },
  methods: {
    getSource: function () {
      //alert(this.news_source);
      this.$store.commit("setNewsSource", this.news_source);
      //console.log("news-source", this.news_source)
    },
  },
  /* async asyncData({ app }) {
    const { sources } = await app.$axios.$get(
      `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`
    );

    return { sources };
  }, */
  mounted() {
    this.$axios
      .$get(
        //`https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.NUXT_ENV_API_KEY}`
        'http://localhost:8080/sources'
      )
      .then((data) => {
        this.items = data.sources;
        //console.log(data.sources);
      });
  },
  /* watch: {
    news_source(newValue) {
      this.$store.commit("setNewsSource", newValue)
    }
  } */
};
</script>