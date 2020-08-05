namespace BomberpacGame {
  import ƒ = FudgeCore;
  import fCore = FudgeCore;
  import ƒAid = FudgeAid;

  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk",
    EXPLODE = "Explode"
  }

  export enum DIRECTION {
    LEFT, RIGHT, UP, DOWN
  }
  export class Sprite extends GameobjectSprite {
    public static animations: ƒAid.SpriteSheetAnimations;
    public speedMax: ƒ.Vector3 = new ƒ.Vector3(4, 4, 4); // units per second
    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    public action: ACTION;
    constructor(_name: string = "Pacman", translateX: number, translateY: number, matrix: number[][]) {
      super(_name, matrix);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(translateX, translateY, 0))));
      this.show(ACTION.IDLE);
    }
    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Sprite.animations[_action]);
    }
  }

  export class Pacman extends Sprite {
    private nav: HTMLElement;
    private score: number = 9;
    private img: HTMLImageElement = document.querySelector("img");
    private spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Food", this.img);
    private period: number = 0;
    private speedMaxPacman: ƒ.Vector3 = new ƒ.Vector3(4, 4, 4); // units per second
    private speedFruit: ƒ.Vector3 = new ƒ.Vector3(1, 1, 1); // units per second

    public speed: ƒ.Vector3 = ƒ.Vector3.ZERO();
    constructor(_name: string = "Pacman", translateX: number, translateY: number) {
      super(_name, translateX, translateY, matrix);
      this.nav = document.getElementsByTagName("nav")[0];
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }
    private collide(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Obstacles")[0].getChildren(); let check: boolean = false;
      for (let obstacle of node) {
        if (pacmanTranslation.isInsideSphere(obstacle.mtxLocal.translation, 0.8)) {
          check = true;
        }
      }
      return check;
    }
    /*private checkCollision(): boolean {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Node")[0].getChildrenByName("food");
      for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.9)) {
          console.log("attached");
        }
      }
      let cmpTransform: fCore.Vector3 = this.cmpTransform.local.translation;
      let x: number = cmpTransform.x / scale;
      let y: number = cmpTransform.y / scale;
      //console.log(x + ", " + y);^
      let yMinus: number = Math.floor(y);
      let yPlus: number = Math.ceil(y);
      let xMinus: number = Math.floor(x);
      let xPlus: number = Math.ceil(x);
      let isCollided: boolean = false;
      if (matrix[xMinus][yPlus] == 1) {
        isCollided = true;
      }
      if (matrix[xMinus][yMinus] == 1) {
        isCollided = true;
      }
      if (matrix[xPlus][yPlus] == 1) {
        isCollided = true;
      }
      if (matrix[xPlus][yMinus] == 1) {
        isCollided = true;
      }
      return isCollided;
    }
    */
    public static generateSprites(_spritesheet: ƒ.CoatTextured): void {
      Pacman.animations = {};
      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Pacman.animations[ACTION.WALK] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
      sprite.generateByGrid(ƒ.Rectangle.GET(0, 0, 33, 30), 3, ƒ.Vector2.ZERO(), 40, ƒ.ORIGIN2D.CENTER);
      Pacman.animations[ACTION.IDLE] = sprite;
      sprite.frames[2].timeScale = 10;
    }

    public show(_action: ACTION): void {
      // show only the animation defined for the action
      this.setAnimation(<ƒAid.SpriteSheetAnimation>Pacman.animations[_action]);
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
      let oldDirection: fCore.Vector3 = this.cmpTransform.local.rotation;
      let cmpTr: fCore.Vector3 = new fCore.Vector3();
      switch (_action) {
        case ACTION.IDLE:
          this.speed.x = 0;
          this.speed.y = 0;
          break;
        case ACTION.WALK:
          if (_direction == 0 || _direction == 1) {
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = this.speedMaxPacman.x; // * direction;
            cmpTr = ƒ.Vector3.Y(90 - 90 * direction);
          }
          else if (_direction == 2 || _direction == 3) {
            let direction: number = (_direction == DIRECTION.UP ? 1 : -1);
            this.speedMaxdr
            this.speed.x = this.speedMax.x;
            cmpTr = ƒ.Vector3.Z(90 * direction);
          }
          if (this.collide()) {
            this.speed.x = -1;
            cmpTr = oldDirection;
          }
          this.cmpTransform.local.rotation = cmpTr;
          break;
        case ACTION.EXPLODE:
          this.createBomb();
      }
      if (_action == this.action)
        return;
      this.action = _action;
      this.show(_action);
    }
    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
      this.cmpTransform.local.translate(distance);
      this.processInput();
      this.eatFood();
      this.eatItem();
      this.collide();
    }
    private processInput(): void {
      if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_LEFT]))
        pacman.act(ACTION.WALK, DIRECTION.LEFT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_RIGHT]))
        pacman.act(ACTION.WALK, DIRECTION.RIGHT);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_UP]))
        pacman.act(ACTION.WALK, DIRECTION.UP);
      else if (ƒ.Keyboard.isPressedCombo([ƒ.KEYBOARD_CODE.ARROW_DOWN]))
        pacman.act(ACTION.WALK, DIRECTION.DOWN);
      else if (ƒ.Keyboard.isPressedCombo([fCore.KEYBOARD_CODE.SPACE]))
        pacman.act(ACTION.EXPLODE);
      else
        pacman.act(ACTION.IDLE);
    }
    private eatFood(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Food")[0].getChildrenByName("food");
      for (let food of node) {
        if (pacmanTranslation.isInsideSphere(food.mtxLocal.translation, 0.2)) {
          let _currentTranslation: fCore.Vector3 = food.mtxLocal.translation;
          matrix[_currentTranslation.x][_currentTranslation.y] = 0;
          let randomTranslateX: number = Level.randomInteger(1, 28);
          let randomTranslateY: number = Level.randomInteger(1, 19);
          matrix[randomTranslateX][randomTranslateY] = 1;
          food.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
          this.nav.innerText = "Score: " + this.score;
          this.score++;
          Sound.play("pacman_eat");
        }
      }
    }
    private createBomb(): void {
      let bomb: Bomb;
      Bomb.generateSprites(this.spritesheet);
      for (let i: number = 0; i < 1; i++) {
        let randomTranslateX: number = Level.randomInteger(1, 28);
        let randomTranslateY: number = Level.randomInteger(1, 19);
        if (!((randomTranslateX == 1 && randomTranslateY == 1) || (randomTranslateX == 27 && randomTranslateY == 1) || (randomTranslateX == 2 && randomTranslateY == 1) || (randomTranslateX == 3 && randomTranslateY == 1) || matrix[randomTranslateX][randomTranslateY] == 1)) {
          bomb = new Bomb("bomb", 1, 1, matrix);
          game.appendChild(bomb);
        }
      }
    }
    private eatItem(): void {
      let pacmanTranslation: fCore.Vector3 = this.mtxLocal.translation;
      let node: fCore.Node[] = game.getChildrenByName("Items")[0].getChildren();
      for (let item of node) {
        let rect: number = (<Item>item).getID();
        if (pacmanTranslation.isInsideSphere(item.mtxLocal.translation, 0.2)) {
          console.log("eat");
          switch (rect) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            /*case 2:
              console.log("two");
              break;
            case 3:
              console.log("three");
              break;
            case 4:
              console.log("four");
              break;
            case 5:
              console.log("five");
              break;
            case 6:
              console.log("six");
              break;
            case 7:
              console.log("seven");
              break;
            case 8:
              let canvas: HTMLCanvasElement = document.querySelector("canvas");
              let img: HTMLImageElement = document.querySelector("img");
              let spritesheet: ƒ.CoatTextured = ƒAid.createSpriteSheet("Pacman", img);
              Pacman.generateSprites(spritesheet);
              for (let i: number = 0; i < 5; i++) {
                let randomTranslateX: number = Level.randomInteger(2, 27);
                let randomTranslateY: number = Level.randomInteger(2, 19);
                let hare: Pacman = new Pacman("Pacman", randomTranslateX, randomTranslateY);
                game.appendChild(hare);
              }
              let _currentTranslation: fCore.Vector3 = item.mtxLocal.translation;
              matrix[_currentTranslation.x][_currentTranslation.y] = 0;
              let randomTranslateX: number = Level.randomInteger(1, 28);
              let randomTranslateY: number = Level.randomInteger(1, 19);
              matrix[randomTranslateX][randomTranslateY] = 1;
              item.mtxLocal.translation = new fCore.Vector3(randomTranslateX, randomTranslateY, 0);
              this.period++;
              console.log(game);
              break;
              break;*/
          }
        }
      }
    }
  }
}