var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(3, 12);
  },
  update: function() {
    if (me.input.isKeyPressed('left')) { this.doWalk(true); } 
    else if (me.input.isKeyPressed('right')) { this.doWalk(false); } 
    else { this.vel.x = 0; };
    if (me.input.isKeyPressed('jump')) {
      var jumpAudio = new Audio("music/sfx/jump.mp3");
      jumpAudio.play();
      this.doJump();
    }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 490){
      if (!this.isFalling){
      var fallAudio = new Audio("music/sfx/fall.mp3");
      fallAudio.play();
      this.gameOver();
      this.isFalling = true;
      }
    }
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
    if (me.state.isCurrent(me.state.LEVEL1)) {
      me.state.change(me.state.LEVEL1);
    } else if (me.state.isCurrent(me.state.LEVEL2)) {
      me.state.change(me.state.LEVEL2);
    } else if (me.state.isCurrent(me.state.LEVEL3)) {
      me.state.change(me.state.LEVEL3);
    }
  },
  youWin: function() {
    me.state.change(me.state.MENU);
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
  }
});
var CoinEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    me.gamestat.updateValue("coins", 1);
    var coinAudio = new Audio("music/sfx/cling.mp3");
    coinAudio.play();
    this.collidable = false;
    me.game.remove(this);
    let test = me.state.isCurrent(me.state.LEVEL1)
     if(me.gamestat.getItemValue("coins") === me.gamestat.getItemValue("totalCoins")){
      if (me.state.isCurrent(me.state.LEVEL1)) {
          me.state.change(me.state.LEVEL2);
      } else if (me.state.isCurrent(me.state.LEVEL2)) {
        me.state.change(me.state.LEVEL3);
      } else {
        obj.youWin();
      }
    }
  }
}); 
var EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    settings.image = "badguy";
    settings.spritewidth = 16;
    this.parent(x, y, settings);
    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    this.pos.x = this.endX;
    this.walkLeft = true;
    this.setVelocity(2);
    this.collidable = true;
  },
  onCollision: function(res, obj) {
    if (!this.isColliding) {
    var stompAudio = new Audio("music/sfx/stomp.mp3");
    stompAudio.play();
    obj.gameOver();
    this.isColliding = true;
    }
  },
  update: function() {
    if (!this.visible){
      return false;
    }
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } 
      else if (!this.walkLeft && this.pos.x >= this.endX){ 
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    }
    else { this.vel.x = 0; }
    this.updateMovement();
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  }
});
var BootsEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
  },
  onCollision : function (res, obj) {
    this.collidable = false;
    me.game.remove(this);
    obj.gravity = obj.gravity/4;
  }
});
