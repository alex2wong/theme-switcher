
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
    font-weight: bold;
    color: @primary-color;

    &.router-link-exact-active {
      color: @primary-color--active;
    }
  }
}
</style>
<script>
import { defaultTheme, darkTheme } from './styles';
import global from './assets/global.less';

export default {
  data: function(){
    return {
      theme: defaultTheme,
    };
  },
  methods: {
    switchTheme() {
      console.warn('switching app theme..');
      this.theme = this.theme.backgroundColor === defaultTheme.backgroundColor ?
        darkTheme : defaultTheme;
    },
  },
  render() {
    console.warn(global);
    return (
      <div id="app" style={this.theme}>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <a href="#" onClick={this.switchTheme}>Switch Theme</a>
        <router-view/>
      </div>
    )
  }
}
</script>
