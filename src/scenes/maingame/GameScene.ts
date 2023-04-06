import { GameSceneBase } from "../../core/scene/GameSceneBase"
import { SoundController } from "../../core/sounds/SoundController"
import { GameController } from "./controllers/GameController"

export class GameScene extends GameSceneBase {
    constructor() {
        super()

        GameController.init(this)
        SoundController.playBGMusic()
        GameController.startNewGame()
    }

    update() {
        GameController.view.update()
        GameController.ballController.update()
    }

    resize() {
        GameController.view.resize()
    }
}