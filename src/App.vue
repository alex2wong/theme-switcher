
<style lang="less">
@import url('./assets/global.less');

#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @primary-color;
  background-color: @primary;
  transition: all .5s ease-in-out;
}

#nav {
  padding: 30px;

  a {
    .navlink();
  }
}
.colorPicker {
  border: none;
  background-color: transparent;
  padding: 0;
}
</style>
<script>
import axios from 'axios';

export default {
  data: function(){
    return {
    };
  },
  methods: {

    switchTheme() {
      const pickedColor = document.querySelector('#colorPicker');
      this.postThemeConfig(pickedColor.value)
    },
    postThemeConfig(primaryColor) {
      const url = 'http://127.0.0.1:3002/customtheme?primaryColor=' +
        primaryColor.slice(1);
      axios.get(url, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          // 'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'text/*'
        },
      })
      .then(response => {
        // console.log('got updated theme g CSS: ', response.data);
        if (response.status === 200) {
          this.updateHeadStyle(response.data);
        }
      })
    },
    // should insert new global.css to Head end.
    updateHeadStyle(newTheme) {
      var head = document.querySelector('head');
      var newStyle = document.createElement('style');
      newStyle.setAttribute('type', 'text/css');
      newStyle.innerText = newTheme;
      head.appendChild(newStyle);
    }
  },
  computed() {
  },
  render() {
    // console.warn(global);
    return (
      <div id="app" class="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <label for="colorPicker">Change Primary color</label>
        <input type='color' id="colorPicker" class="colorPicker"/>
        <a href="#" onClick={this.switchTheme}>Switch Theme</a>
        <router-view/>
      </div>
    )
  }
}
</script>
