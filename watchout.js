var game = {};

game.gameboard = d3.select(".stage").append("svg")
  .attr("width", 750).attr("height", 500);

game.score = 0;
game.highScore = 0;
game.width = 750;
game.height = 500;
game.player = {};
game.player.x = game.width/2;
game.player.y = game.height/2;
game.player.r = 10;
game.collisionDetected = false;

game.initEnemies = function(){
  var enemyList = [];

  for (i = 0; i < 20; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.r = 10;
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
  .attr("r", function(d){
    return d.r;
  });

game.gameboard.selectAll("circle.player").data([game.player]).enter()
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

  game.gameboard.selectAll("circle.enemy").each(function(enemy){
    //must reference game.player

    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");

    var playerX = d3.selectAll(".player").attr("cx");
    var playerY = d3.selectAll(".player").attr("cy");

    var xDistance = Math.abs(enemyX - playerX);
    var yDistance = Math.abs(enemyY - playerY);
    var combinedRadius = enemy.r + game.player.r;

    if ((xDistance < combinedRadius) && (yDistance < combinedRadius)){
      game.collisionDetected = true;
    }
  });
};

setInterval(function(){
  game.collision();
  if (game.collisionDetected){
    game.score = 0;
    game.collisionDetected = false;
  }
  d3.selectAll(".scores").text("Score: " + game.score);
  game.score++;
  if (game.score > game.highScore){
    game.highScore = game.score;
    d3.selectAll(".highScore").text("High Score: " + game.highScore);
  }
}, 100);

setInterval(function(){
  d3.selectAll(".enemy").transition().duration(1200)
    .attr("cx", function(){return Math.random() * game.width;})
    .attr("cy", function(){return Math.random() * game.height;});
}, 1000);


