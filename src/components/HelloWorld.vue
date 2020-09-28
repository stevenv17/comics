<template>
  <div >
    <h1>{{title}}</h1>
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

  </div>
</template>

<script>
import axios from "axios";
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

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
  width: 700px;
  overflow: scroll;
  border: 1px solid #eee;
  scroll-behavior: auto;
}

.image_center{
  margin: auto;
}

.rate{
  padding: 1rem;
}

</style>
