
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
import { defaultTheme } from './styles';
import global from './assets/global.less';

export default {
  data: function(){
    return {
      theme: defaultTheme,
    };
  },
  methods: {
    switchTheme(value) {
      console.warn('switching app theme..: ', value);
      const pickedColor = document.querySelector('#colorPicker');
      this.theme = Object.assign({}, defaultTheme, { backgroundColor: pickedColor.value })
      this.postThemeConfig(pickedColor.value)
    },
    postThemeConfig(primaryColor) {
      fetch('http://127.0.0.1:3002/customtheme', {
        body: JSON.stringify({ primaryColor }), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          // 'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
      .then(response => response.json())
    },
    // should insert new global.css to 
  },
  computed() {
  },
  render() {
    console.warn(global);
    return (
      <div id="app" style={this.theme}>
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
