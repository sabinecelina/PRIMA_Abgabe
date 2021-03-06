"use strict";
var Bomberpac;
(function (Bomberpac) {
    var ƒAid = FudgeAid;
    class Floor extends Bomberpac.Gameobject {
        constructor(_name, gameField, game, data) {
            super(_name, gameField);
            this.img = document.querySelector("img");
            this.spritesheet = ƒAid.createSpriteSheet("Spritesheet", this.img);
            this.obstacles = new Bomberpac.fCore.Node("Obstacles");
            this.gameField = gameField;
            this.data = data;
            this.fetchData();
            this.createFloor(this.amountOfObstacles);
            this.createFood(this.amountOfFood);
            this.createItems(this.amountOfItems);
            (this.data);
        }
        fetchData() {
            this.amountOfObstacles = Number(this.data.amountOfObstacles);
            this.amountOfFood = Number(this.data.amountOfFood);
            this.amountOfItems = Number(this.data.amountOfItems);
        }
        createFloor(_amountOfObstacles) {
            for (let i = 0; i < 31; i++) {
                let walls = new Bomberpac.Obstacle("wall", Bomberpac.gameField, i, 0, Floor.scale, Floor.mesh, Floor.color);
                this.obstacles.appendChild(walls);
                walls = new Bomberpac.Obstacle("wall", Bomberpac.gameField, i, 20, Floor.scale, Floor.mesh, Floor.color);
                this.obstacles.appendChild(walls);
            }
            for (let i = 0; i < 31; i++) {
                let walls = new Bomberpac.Obstacle("wall", Bomberpac.gameField, 0, i, Floor.scale, Floor.mesh, Floor.color);
                this.obstacles.appendChild(walls);
                walls = new Bomberpac.Obstacle("wall", Bomberpac.gameField, 29, i, Floor.scale, Floor.mesh, Floor.color);
                this.obstacles.appendChild(walls);
            }
            while (this.obstacles.getChildrenByName("obstacles").length < _amountOfObstacles) {
                let randomTranslateX = Bomberpac.getRandomTranslateX();
                let randomTranslateY = Bomberpac.getRandomTranslateX();
                if (!((randomTranslateX == 28 && randomTranslateY == 19) || (randomTranslateX == 10 && randomTranslateY == 10) || (randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 28 && randomTranslateY == 1)
                    || (randomTranslateX == 2 && randomTranslateY == 1 || (randomTranslateX == 3 && randomTranslateY == 1)))) {
                    let obstacles = new Bomberpac.Obstacle("obstacles", Bomberpac.gameField, randomTranslateX, randomTranslateY, Floor.scale, Floor.mesh, Floor.color);
                    this.obstacles.appendChild(obstacles);
                }
                this.appendChild(this.obstacles);
            }
        }
        createFood(_amountofFood) {
            let foodNode = new Bomberpac.fCore.Node("Food");
            let food;
            Bomberpac.Food.generateSprites(this.spritesheet);
            for (let i = 0; i < _amountofFood; i++) {
                let randomTranslateX = Bomberpac.randomInteger(1, 28);
                let randomTranslateY = Bomberpac.randomInteger(1, 19);
                if (!((randomTranslateX == 28 && randomTranslateY == 19) || (randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 15 && randomTranslateY == 15) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || this.gameField[randomTranslateX][randomTranslateY] == 1)) {
                    this.gameField[0][i] = 1;
                    food = new Bomberpac.Food("food", randomTranslateX, randomTranslateY, this.gameField);
                    foodNode.appendChild(food);
                }
                this.appendChild(foodNode);
            }
        }
        createItems(_amountOfItems) {
            let id = 0;
            let sprites = [0, 32.6, 65.2, 97.8, 130.3, 163, 195.6, 228.2];
            let itemNode = new Bomberpac.fCore.Node("Items");
            let pill;
            let img = document.querySelector("img");
            let spritesheet = ƒAid.createSpriteSheet("Item", img);
            for (let i = 0; i < _amountOfItems; i++) {
                let randomNumber = Bomberpac.randomInteger(0, 6);
                switch (randomNumber) {
                    case 0:
                        id = 0;
                        break;
                    case 1:
                        id = 1;
                        break;
                    case 2:
                        id = 2;
                        break;
                    case 3:
                        id = 3;
                        break;
                    case 4:
                        id = 4;
                        break;
                    case 5:
                        id = 5;
                        break;
                    case 6:
                        id = 6;
                        break;
                }
                let randomTranslateX = Bomberpac.getRandomTranslateX();
                let randomTranslateY = Bomberpac.getRandomTranslateY();
                Bomberpac.Pill.generateSprites(spritesheet, sprites[randomNumber]);
                if (!((randomTranslateX == 28 && randomTranslateY == 19) || (randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 15 && randomTranslateY == 15) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || this.gameField[randomTranslateX][randomTranslateY] == 1)) {
                    pill = new Bomberpac.Pill("Item", randomTranslateX, randomTranslateY, this.gameField, id);
                    itemNode.appendChild(pill);
                }
            }
            Bomberpac.Pill.generateSprites(spritesheet, sprites[7]);
            pill = new Bomberpac.Pill("Item", 28, 19, this.gameField, 7);
            itemNode.appendChild(pill);
            this.appendChild(itemNode);
        }
    }
    Floor.mesh = new Bomberpac.fCore.MeshCube();
    Floor.color = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")));
    Floor.scale = 1;
    Bomberpac.Floor = Floor;
})(Bomberpac || (Bomberpac = {}));
//# sourceMappingURL=Floor.js.map