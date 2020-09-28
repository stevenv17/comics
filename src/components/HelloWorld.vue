<template>
  <div >
    <h1 class="title">{{title}}</h1>
    <el-container class="image_container" v-loading="loading">
      <div class="image_center">
        <el-image :src="image"></el-image>
      </div>
    </el-container>

    <el-rate
        class="rate"
        v-model="value"
        :texts="texts"
        show-text>
    </el-rate>
    <el-button type="primary" icon="el-icon-refresh" v-on:click="loadLastComic"></el-button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {

  },
  data() {
    return {
      value: null,
      texts: ['oops', 'disappointed', 'normal', 'good', 'great'],
      title: null,
      image: null,
      last_commit: null,
      loading: true

    }
  },
  methods:{
    loadRandomComic: function(){
      const that = this;
      let comic = Math.floor(Math.random() * this.last_commit) + 1;
      axios
      .get("/comics/api/"+comic+"/info.0.json")
      .then(function (response) {
        that.image = response.data.img;
        that.title = response.data.safe_title;
        that.loading = false;
      })
      .catch(function (error) {
        if (error.response.status == 500) {
          alert("Error loading comic");
        }
      });
    },

    loadLastComic: function(){
      this.loading = true;
      this.value = null;
      const that = this;
      axios
          .get("/comics/api/609/info.0.json")
          .then(function (response) {
            that.last_commit = response.data.num;
            that.loadRandomComic();
          })
          .catch(function (error) {
            if (error.response.status == 500) {
              alert("Error loading comic");
            }
          });
    }
  },
  mounted() {
    this.loadLastComic();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.image_container{
  width: 80%;
  margin: auto;
  height: 600px;
  width: 720px;
  overflow-y: auto;
  border: 0.2rem solid #eee;
  scroll-behavior: auto;
  padding: 1rem;
}

.image_center{
  margin: auto;
}

.rate{
  padding: 1rem;
}

.title{
  color: teal;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #00808070;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00808099;
}

</style>
