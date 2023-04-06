import { Assets, Container, Sprite, Text } from "pixi.js"
import { SceneManager } from "../../../core/scene/SceneManager"
import { Model } from "../../../model/Model"

export class GameUI extends Container {
    private topBar: Sprite

    private ballsIndicator: Text
    private pointsIndicator: Text

    constructor() {
        super()
        this.topBar = Sprite.from(Assets.get("topbar_bg.png"))
        this.topBar.anchor.set(0.5)
        this.topBar.x = SceneManager.gameArea.width / 2
        this.topBar.y = 100
        this.addChild(this.topBar)

        this.ballsIndicator = new Text(
            "", {
            fontFamily: 'Golos Text',
            fontSize: 25,
            fill: 0x000000,
            fontWeight: "700",
            align: 'center',
        }
        )
        this.ballsIndicator.anchor.set(0.5)
        this.ballsIndicator.x = SceneManager.gameArea.width / 2 - 22
        this.ballsIndicator.y = 97
        this.addChild(this.ballsIndicator)


        this.pointsIndicator = new Text(
            "", {
            fontFamily: 'Golos Text',
            fontSize: 25,
            fill: 0x717171,
            fontWeight: "700",
            align: 'center',
        }
        )
        this.pointsIndicator.anchor.set(0.5)
        this.pointsIndicator.x = SceneManager.gameArea.width / 2 + 60
        this.pointsIndicator.y = 97
        this.addChild(this.pointsIndicator)

        this.valuesUpdate()
    }

    valuesUpdate() {
        this.ballsIndicator.text = Model.ballCounter.toString()
        this.pointsIndicator.text = Model.score.toString()
    }
}