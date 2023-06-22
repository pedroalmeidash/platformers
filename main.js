var jsApp = {
  onload: function() {
    if (!me.video.init('jsapp', 320, 240, true, 2.0)) {
      alert("html 5 canvas is not supported by this browser.");
      return;
    }
    me.loader.onload = this.loaded.bind(this);
    me.loader.preload(resources);
    me.state.change(me.state.LOADING);
    me.gamestat.add("coins", 0);
    me.gamestat.add("totalCoins", 4);  
  },
  loaded: function() {
    me.entityPool.add("player", PlayerEntity);
    me.entityPool.add("coin", CoinEntity);
    me.entityPool.add("boots", BootsEntity);
    me.entityPool.add("EnemyEntity", EnemyEntity);
    me.state.LEVEL1 = 9
    me.state.LEVEL2 = 10
    me.state.LEVEL3 = 11
    me.state.set(me.state.LEVEL1, new PlayScreen());
    me.state.set(me.state.LEVEL2, new Level2());
    me.state.set(me.state.LEVEL3, new Level3());
    me.state.set(me.state.MENU, new TitleScreen());
    me.state.transition("fade", "#2FA2C2", 250);
    me.state.change(me.state.MENU);
  }
};
window.onReady(function() {
  jsApp.onload();
});
