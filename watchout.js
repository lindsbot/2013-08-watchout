var game = {};

game.gameboard = d3.select(".stage").append("svg")
  .attr("width", 750).attr("height", 500);

//make player
//detect collisions > fire event
//scoreboard reset on event
//increment score every x time
//particles? aware of eachothers position/proximity

// make score board

/*

on some interval, compare each enemy's position with the position of our player

fire an event to reset score

if no collisions, add to score, update scoreboard in view

*/

game.score = 0;
game.width = 750;
game.height = 500;
game.player = {};
game.player.r = 10;
game.collisionDetected = false;

game.initEnemies = function(){
  var enemyList = [];

  for (i = 0; i < 20; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random() * game.width;
    enemy.y = Math.random() * game.height;
    enemyList.push(enemy);
  }
  return enemyList;
}();

game.dragFunction = d3.behavior.drag().on("drag", function(d){
  d.x += d3.event.dx;
  d.y += d3.event.dy;

  d3.select(this)
    .attr("cx", function(d){
      return d.x;
    })
    .attr("cy", function(d){
      return d.y;
    });
});

game.gameboard.selectAll("circle.enemy").data(game.initEnemies).enter()
  .append("svg:circle")
  .attr("class", "enemy")
  .attr("cx", function(d){
    return d.x;
  })
  .attr("cy", function(d){
    return d.y;
  })
  .attr("r", 10);

game.gameboard.selectAll("circle.player").data([{x: game.width/2, y : game.height/2}]).enter()
  .append("svg:circle")
  .attr("class", "player")
  .attr("cx", function(d){
    return d.x;
  })
  .attr("cy", function(d){
    return d.y;
  })
  .attr("r", game.player.r)
 .call(game.dragFunction);

game.collision = function() {
  var bool = false;
  var player = game.gameboard.selectAll("circle.player");

  game.gameboard.selectAll("circle.enemy").each(function(enemy){
    //must reference game.player
    if (Math.abs((enemy.x - player.x) < 20) && Math.abs((enemy.y - player.y) < 20)){
      game.collisionDetected = true;
    }
  });
  return bool;
};

setInterval(function(){
  if( !!game.collision() ){
    game.score = 0;
  }
  d3.selectAll(".scores").text("Score: " + game.score);
  game.score++;
}, 100);

setInterval(function(){
  d3.selectAll(".enemy").transition().duration(1200)
    .attr("cx", function(){return Math.random() * game.width;})
    .attr("cy", function(){return Math.random() * game.height;});
}, 1000);


