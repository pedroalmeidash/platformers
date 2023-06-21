var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("coins");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("level1");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    document.getElementById('game_state').innerHTML = "Collect all of the coins!";
    document.getElementById('instructions').innerHTML = "Arrows to move and Space to jump.";
  }
});

var Level2 = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("coins");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("level2");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    document.getElementById('game_state').innerHTML = "Collect all of the coins!";
    document.getElementById('instructions').innerHTML = "Arrows to move and Space to jump.";
  }
});

var TitleScreen = me.ScreenObject.extend({
  init: function() {
    this.titleScreenST = new Audio("music/soundtrack/a_night_of_dizzy_spells.mp3");
    this.titleScreenST.loop = true;
    this.titleScreenST.play();
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
  },
  onResetEvent: function() {
    this.titleScreenST.load();
    this.titleScreenST.play();
    if (this.title == null) {
      this.title = me.loader.getImage("titleScreen");
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = ""; 
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.LEVEL1);
      this.titleScreenST.pause();
    }
    return true;
  },
  draw: function(context){
    context.drawImage(this.title, 50, 50);
  }
});
