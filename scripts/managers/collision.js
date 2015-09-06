/// <reference path="../game.ts" />
/*
    Description: Checks and handles collisions between objects every time update() is called.
*/
var managers;
(function (managers) {
    var Collision = (function () {
        function Collision(ship, pickup, enemies, projectiles, scoreboard) {
            this.enemies = [];
            this.projectiles = [];
            this.projectilesToDelete = [];
            this.plane = ship;
            this.pickup = pickup;
            this.enemies = enemies;
            this.projectiles = projectiles;
            this.scoreboard = scoreboard;
        }
        Collision.prototype.distance = function (p1, p2) {
            var xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;
            var yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;
            var result = Math.sqrt(xPoints + yPoints);
            return result;
        };
        Collision.prototype.shipAndEnemies = function (enemy) {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.plane.x;
            p1.y = this.plane.y;
            p2.x = enemy.x;
            p2.y = enemy.y;
            if (this.distance(p1, p2) < ((this.plane.height * 0.5) + (enemy.height * 0.5))) {
                createjs.Sound.play("explode1");
                createjs.Sound.play("explode2");
                this.scoreboard.lives -= 1;
                enemy.reset();
                ship.setInvulnerable(true);
            }
        };
        Collision.prototype.projectilesAndEnemies = function (projectile, enemy) {
            if (!projectile.isEnemy) {
                var p1 = new createjs.Point();
                var p2 = new createjs.Point();
                p1.x = projectile.x;
                p1.y = projectile.y;
                p2.x = enemy.x;
                p2.y = enemy.y;
                if (this.distance(p1, p2) < ((projectile.height * 0.5) + (enemy.height * enemy.scaleY * 0.5))) {
                    if (enemy.takeHit()) {
                        createjs.Sound.play("explode2");
                        if (enemy.enemyType === 4) {
                            this.scoreboard.score += 4000;
                            this.scoreboard.score += 1000 * this.scoreboard.lives;
                            wonGame = true;
                            enemy.destroy();
                        }
                        else {
                            this.scoreboard.score += enemy.enemyType * 100;
                            enemy.reset();
                        }
                    }
                    else {
                        createjs.Sound.play("explode1");
                        createjs.Sound.play("explode1");
                        this.scoreboard.score += 50;
                    }
                    this.projectilesToDelete.push(projectile);
                }
            }
        };
        Collision.prototype.projectilesAndShip = function (projectile) {
            if (projectile.isEnemy) {
                var p1 = new createjs.Point();
                var p2 = new createjs.Point();
                p1.x = projectile.x;
                p1.y = projectile.y;
                p2.x = ship.x;
                p2.y = ship.y;
                if (this.distance(p1, p2) < ((projectile.height * 0.5) + (ship.height * 0.5))) {
                    createjs.Sound.play("explode1");
                    createjs.Sound.play("explode2");
                    this.scoreboard.lives -= 1;
                    ship.setInvulnerable(true);
                    ship.weaponType = 1;
                    this.projectilesToDelete.push(projectile);
                    return true;
                }
            }
            return false;
        };
        Collision.prototype.shipAndPickup = function () {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.plane.x;
            p1.y = this.plane.y;
            p2.x = this.pickup.x;
            p2.y = this.pickup.y;
            if (this.distance(p1, p2) < ((this.plane.height / 2) + (this.pickup.height / 2))) {
                createjs.Sound.play("powerup");
                ship.setInvulnerable(true);
                ship.weaponType = 2;
                this.scoreboard.score += 1000;
                this.pickup.goAway();
            }
        };
        Collision.prototype.update = function () {
            if (!ship.invulnerable) {
                for (var count = 0; count < constants.ENEMY_NUM[currentLevel]; count++) {
                    this.shipAndEnemies(this.enemies[count]);
                }
                for (var p = 0; p < this.projectiles.length; p++) {
                    if (this.projectilesAndShip(this.projectiles[p])) {
                        break;
                    }
                }
            }
            if (pickup.visible) {
                this.shipAndPickup();
            }
            for (var i = 0; i < constants.ENEMY_NUM[currentLevel]; i++) {
                for (var j = 0; j < this.projectiles.length; j++) {
                    this.projectilesAndEnemies(this.projectiles[j], this.enemies[i]);
                }
                if (this.projectilesToDelete.length > 0) {
                    for (var k in this.projectilesToDelete) {
                        var index = projectiles.indexOf(this.projectilesToDelete[k]);
                        if (index !== -1) {
                            projectiles[index].destroy();
                        }
                    }
                }
            }
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map