import { Container, Text } from "pixi.js"
import { GameBG } from "../ui/GameBG"
import { GameLayer } from "../gameobjects/GameLayer"
import { GameUI } from "../ui/GameUI"
import { Clouds } from "../gameobjects/Clouds"
import { SceneManager } from "../../../core/scene/SceneManager"
import { Balloon } from "../gameobjects/Balloon"
import { Model } from "../../../model/Model"

//view for main game 
export class GameView {
    private gameBG: GameBG
    public gameLayer: GameLayer
    public gameUI: GameUI
    private clouds: Clouds

    private gameStartBall: Balloon | undefined
    private gameOverBall: Balloon | undefined

    private message_a: Text | undefined
    private message_b: Text | undefined
    private animator: number = 0

    constructor(_root: Container) {
        this.gameBG = new GameBG()
        _root.addChild(this.gameBG)
        this.gameLayer = new GameLayer()
        _root.addChild(this.gameLayer)
        this.clouds = new Clouds()
        _root.addChild(this.clouds)
        this.gameUI = new GameUI()
        _root.addChild(this.gameUI)
    }

    showGameStart(_cbc: Function) {
        this.message_a = new Text(
            'Collect\nballoons', {
            fontFamily: 'Golos Text',
            fontSize: 60,
            fill: 0xffffff,
            align: 'center',
        })

        this.message_a.anchor.set(0.5)
        this.message_a.x = SceneManager.gameArea.x + SceneManager.gameArea.width / 2
        this.message_a.y = SceneManager.gameArea.y + 250
        this.gameLayer.addChild(this.message_a)

        this.animator = 0
        this.gameStartBall = new Balloon(-1, Model.selectedColor)
        this.gameStartBall.sprite.scale.set(1)
        this.gameStartBall.x = SceneManager.gameArea.x + SceneManager.gameArea.width / 2
        this.gameStartBall.y = SceneManager.gameArea.y + 390
        this.gameLayer.addChild(this.gameStartBall)
        this.gameStartBall.registerAction(_cbc)

        this.message_b = new Text(
            'Press\nto start', {
            fontFamily: 'Golos Text',
            fontSize: 60,
            fill: 0xffffff,
            align: 'center',
        })

        this.message_b.anchor.set(0.5)
        this.message_b.x = SceneManager.gameArea.x + SceneManager.gameArea.width / 2
        this.message_b.y = SceneManager.gameArea.y + 550
        this.gameLayer.addChild(this.message_b)

    }

    async cleanStartScreen() {
        if (this.message_a) {
            this.gameLayer.removeChild(this.message_a)
            this.message_a.destroy()
            this.message_a = undefined
        }
        if (this.message_b) {
            this.gameLayer.removeChild(this.message_b)
            this.message_b.destroy()
            this.message_b = undefined
        }
        if (this.gameStartBall) {
            await this.gameStartBall.kill()

            this.gameLayer.removeChild(this.gameStartBall)
            this.gameStartBall.destroy()
            this.gameStartBall = undefined
        }
        if (this.gameOverBall) {
            await this.gameOverBall.kill()

            this.gameLayer.removeChild(this.gameOverBall)
            this.gameOverBall.destroy()
            this.gameOverBall = undefined
        }
    }

    showGameOver(_cbc: Function) {
        this.message_a = new Text(
            'GAME\nOVER', {
            fontFamily: 'Golos Text',
            fontSize: 60,
            fill: 0x000000,
            align: 'center',
        }
        )
        this.message_a.anchor.set(0.5)
        this.message_a.x = SceneManager.gameArea.x + SceneManager.gameArea.width / 2
        this.message_a.y = SceneManager.gameArea.y + 250
        this.gameLayer.addChild(this.message_a)

        this.message_b = new Text(
            'score:\n' + Model.score, {
            fontFamily: 'Golos Text',
            fontSize: 40,
            fill: 0xffffff,
            align: 'center',
        }
        )
        this.message_b.anchor.set(0.5)
        this.message_b.x = SceneManager.gameArea.x + SceneManager.gameArea.width / 2
        this.message_b.y = SceneManager.gameArea.y + 450
        this.gameLayer.addChild(this.message_b)

        this.animator = 0
        this.gameOverBall = new Balloon(-2, 0)
        this.gameOverBall.sprite.scale.set(1)
        this.gameOverBall.x = SceneManager.gameArea.x + SceneManager.gameArea.width / 2
        this.gameOverBall.y = SceneManager.gameArea.y + 580
        this.gameLayer.addChild(this.gameOverBall)
        this.gameOverBall.registerAction(_cbc)

        let again = new Text(
            'again?', {
            fontFamily: 'Golos Text',
            fontSize: 20,
            fontWeight: "900",
            fill: 0x000000,
            align: 'center',
        }
        )
        again.anchor.set(0.5)
        again.y = -5
        this.gameOverBall.addChild(again)
    }

    resize() {
        this.gameBG.resize()
        this.clouds.resize()
        this.gameLayer.resize()
        this.gameUI.x = SceneManager.gameArea.x
        this.gameUI.y = SceneManager.gameArea.y
    }

    update() {
        if (this.gameStartBall) {
            this.animator += 0.05
            this.gameStartBall.y += Math.sin(this.animator)
        }

        if (this.gameOverBall) {
            this.animator += 0.05
            this.gameOverBall.y += Math.sin(this.animator)
        }
    }
}