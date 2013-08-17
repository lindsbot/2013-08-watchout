var game = {};

game.gameboard = d3.select(".stage").append("svg")
  .attr("width", 750).attr("height", 500);

//make player
//detect collisions > fire event
//scoreboard reset on event
//increment score every x time
//particles? aware of eachothers position/proximity

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

setInterval(function(){
  d3.selectAll(".enemy").transition().duration(1200)
    .attr("cx", function(){return Math.random() * 750;})
    .attr("cy", function(){return Math.random() * 500;});
}, 1000);


