var game = {};

game.gameboard = d3.select(".stage").append("svg:svg").attr("width", 750).attr("height", 500);


game.enemies = function(){
  var enemyList = [];

  for (i = 0; i < 20; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random() * 500;
    enemy.y = Math.random() * 500;
    enemyList.push(enemy);
  }
  return enemyList;
}();

game.gameboard.selectAll("circle.enemy").data(game.enemies).enter()
  .append("svg:circle")
  .attr("class", "enemy")
  .attr("cx", function(d){
    return d.x;
  })
  .attr("cy", function(d){
    return d.y;
  })
  .attr("r", 10);

console.log(game.enemies);


//some function that works with d3 enter/"update"/exit

//create the truth were going to pass to our d3 fn

