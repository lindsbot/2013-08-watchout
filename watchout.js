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

// game.initPlayer = function() {
//   var array = [];
//   var player = {};
//   player.x = 375;
//   player.y = 250;
//   return array.push(player);
// }();

var dragFunction = d3.behavior.drag().on("drag", function(){
  console.log("hello!");
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


game.gameboard.selectAll("circle.test").data([{ id: "test"}]).enter()
  .append("svg:circle")
  .attr("class", "test");


// select d3 player thing, .call(drag)

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


//add drag event to player piece
//var drag = d3.behavior.drag().on("drag", function(player){
//  console.log("i'm dragging now");
// })




setInterval(function(){
  d3.selectAll(".enemy").transition().duration(1200)
    .attr("cx", function(){return Math.random() * 750;})
    .attr("cy", function(){return Math.random() * 500;});
}, 1000);


