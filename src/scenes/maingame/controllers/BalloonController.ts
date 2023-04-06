import { Container } from "pixi.js"
import { Balloon } from "../gameobjects/Balloon"
import { SceneManager } from "../../../core/scene/SceneManager"
import { Engine, GameUtils } from "../../../core/Engine"
import { Model } from "../../../model/Model"
import { GameController } from "./GameController"

export class BaloonController {
    private balloonsList = new Map<number, Balloon>()
    private layer: Container
    private isSpawn = false
    public isActive = false
    constructor(_layer: Container) {
        this.layer = _layer
    }

    startSpawn() {
        this.isActive = true
        this.isSpawn = true
        this.spawnBalloon()
    }

    stopSpawn() {
        this.isSpawn = false
    }

    private async spawnBalloon() {
        let ball = new Balloon(Model.ballCounter, Model.spawn.nColor)
        this.balloonsList.set(Model.ballCounter, ball)
        ball.x = SceneManager.gameArea.x + 50 + Math.round(Math.random() * (SceneManager.gameArea.width - 100))
        ball.y = Model.spawn.spawnBottonY
        this.layer.addChild(ball)
        ball.registerAction(this.clickOnBalloon.bind(this))

        Model.ballCounter++

        GameController.view.gameUI.valuesUpdate()
        if (Model.maxRoundSize === Model.ballCounter) {
            this.stopSpawn()
        }

        if (this.isSpawn) {
            await GameUtils.wait(Model.spawn.spawnTime + Math.random())
            this.spawnBalloon()
        }
    }

    async clickOnBalloon(e: any) {
        let balloon = (e.currentTarget as Balloon)
        if (balloon.colorID === Model.selectedColor) {
            Model.score++
            GameController.view.gameUI.valuesUpdate()
        }
        await balloon.kill()
        this.destroyBalloon(balloon.id)
    }

    private destroyBalloon(id: number) {
        let ball = this.balloonsList.get(id)
        if (ball) {
            this.layer.removeChild(ball)
            ball.destroy()
            this.balloonsList.delete(id)
        }
    }

    update() {
        if (this.isActive) {
            for (let id of this.balloonsList.keys()) {
                let ball = this.balloonsList.get(id)
                if (ball) {
                    if (ball.y > Model.spawn.killTopY) {
                        ball.x += ball.wind * Engine.app.ticker.deltaTime
                        if (ball.x < SceneManager.gameArea.x + 50 || ball.x > SceneManager.gameArea.x + SceneManager.gameArea.width - 50) {
                            ball.wind = -ball.wind
                        }
                        ball.y -= ball.speed * Engine.app.ticker.deltaTime
                    } else {
                        this.destroyBalloon(id)
                    }
                }
            }

            if (this.balloonsList.size === 0 && this.isActive === true) {
                this.isActive = false
                GameController.gameOver()
            }
        }
    }
}