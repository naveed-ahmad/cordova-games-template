// Import fastClick
import FastClick from 'fastclick';


var s_oLocalStorage;
var isTablet = true;
var stageWidth,stageHeight=0;
var isLoaded=false;

var Game = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this._GamesLab_onDeviceReady.bind(this), false);
  },

  _GamesLab_onPause: function () {
    sizeHandler();
  },
  _GamesLab_onResume: function () {
    sizeHandler();
  },
  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  _GamesLab_onDeviceReady: function () {
    try {
      window.ga.startTrackerWithId('UA-59332715-1', 30)
    } catch (e) {
    }
    s_oLocalStorage = new CLocalStorage();

    logAnalyticEvent("start_session");

    // Attach fastclick
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }

    // Initialize the game here.

    document.addEventListener('pause', this._GamesLab_onPause.bind(this), false);
    document.addEventListener('resume', this._GamesLab_onResume.bind(this), false);
    window.addEventListener("orientationchange", onOrientationChange);
    window.addEventListener('resize', function () {
      sizeHandler();
    }, true);

    setTimeout(function () {
      sizeHandler();
    }, 100);
  }
};

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app
  },
  mounted() {
    window.addEventListener('load', () => {
        // run after everything is in-place
        FastClick.attach(document.body);
    })
  },
});
