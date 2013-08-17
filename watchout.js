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



game.render = function(enemyList) {
  //set the position attr to new random position
  //animate to that position
  enemyList.attr("cx", function(d){
    return Math.random()*500; });

};

setInterval(function(){
  d3.selectAll(".enemy").attr("cx", function(){return Math.random() * 500;}).attr("cy", function(){return Math.random() * 500;});
}, 1000);
//settimeout calls render function on all enemies


//some function that works with d3 enter/"update"/exit

//create the truth were going to pass to our d3 fn

