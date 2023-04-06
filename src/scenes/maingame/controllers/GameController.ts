import { Model } from "../../../model/Model"
import { BaloonController } from "./BalloonController"
import { GameView } from "../view/GameView"
import { Container } from "pixi.js"

export class GameController {
    public static view: GameView
    public static ballController: BaloonController

    static init(_root: Container) {
        this.view = new GameView(_root)
        this.ballController = new BaloonController(this.view.gameLayer)
    }

    static startNewGame() {
        this.view.cleanStartScreen()
        Model.gameState = "start"
        Model.ballCounter = 0
        Model.score = 0
        Model.selectedColor = Model.spawn.rndColor
        this.view.showGameStart(this.runGame.bind(this))
    }

    static runGame() {
        this.view.cleanStartScreen()
        Model.gameState = "active"
        this.ballController.startSpawn()
    }

    static gameOver() {
        this.view.showGameOver(this.startNewGame.bind(this))
    }
}