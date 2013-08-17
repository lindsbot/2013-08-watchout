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

game.initEnemies = function(){
  var enemyList = [];

  for (i = 0; i < 20; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random() * 750;
    enemy.y = Math.random() * 500;
    enemyList.push(enemy);
  }
  return enemyList;
}();

var dragFunction = d3.behavior.drag().on("drag", function(d){
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

game.gameboard.selectAll("circle.player").data([{x: 375, y : 250}]).enter()
  .append("svg:circle")
  .attr("class", "player")
  .attr("cx", function(d){
    return d.x;
  })
  .attr("cy", function(d){
    return d.y;
  })
  .attr("r", 10)
 .call(dragFunction);

setInterval(function(){
  d3.selectAll(".scores").text("Score: " + game.score);
  game.score++;
}, 100);

setInterval(function(){
  d3.selectAll(".enemy").transition().duration(1200)
    .attr("cx", function(){return Math.random() * 750;})
    .attr("cy", function(){return Math.random() * 500;});
}, 1000);


