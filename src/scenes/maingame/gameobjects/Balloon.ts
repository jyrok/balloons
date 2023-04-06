import { AnimatedSprite, Assets, Container, Sprite, Text, Texture } from "pixi.js"
import { Model } from "../../../model/Model"
import { GameUtils } from "../../../core/Engine"
import { gsap } from "gsap"
import { SoundController } from "../../../core/sounds/SoundController"

export class Balloon extends Container {
    public id: number
    public sprite: Sprite
    public explosion: AnimatedSprite | undefined

    public spScale: number = 1
    public colorID: number
    public speed: number = 0
    public wind: number = 0

    constructor(_id: number, _colorID: number) {
        super()
        this.id = _id
        this.sprite = Sprite.from(Assets.get("baloon00.png"))
        this.sprite.anchor.set(0.5)
        this.addChild(this.sprite)
        this.colorID = _colorID

        this.spScale = 1 + Math.random() / 2

        this.sprite.tint = Model.spawn.getTintColor(this.colorID)
        this.sprite.scale.set(this.spScale)

        this.speed = 2 + Math.random()
        let windRND = Math.random()
        if (windRND < 0.33) {
            this.wind = -1
        } else if (windRND > 0.66) {
            this.wind = 0
        } else {
            this.wind = 1
        }
    }

    registerAction(_cbc: Function) {
        if (this) {
            this.eventMode = "dynamic"
            this.cursor = 'pointer'
            this.once('pointerdown', _cbc.bind(this))
        }
    }

    async kill() {
        const textures = []
        for (let i = 0; i < 10; i++) {
            const texture = Texture.from(`baloon0${i}.png`)
            textures.push(texture)
        }

        SoundController.play("pop")

        this.explosion = new AnimatedSprite(textures)
        this.explosion.anchor.set(0.5)
        this.explosion.tint = this.sprite.tint
        this.explosion.scale.set(this.sprite.scale.x)
        this.removeChild(this.sprite)
        this.explosion.loop = false

        this.addChild(this.explosion)
        this.explosion.play()

        if (this.colorID === Model.selectedColor && this.id > -1) {
            let plusPoint = new Text(
                '+1', {
                fontFamily: 'Golos Text',
                fontSize: 40,
                fontWeight: "900",
                fill: 0x000000,
                align: 'center',
            }
            )
            plusPoint.anchor.set(0.5)
            this.addChild(plusPoint)
            gsap.to(plusPoint, {
                y: -30,
                duration: 0.240,
            })

            SoundController.play("add")
        }

        gsap.to(this.scale, {
            x: 1.4,
            y: 1.4,
            duration: 0.240,
        })

        gsap.to(this, {
            alpha: 0,
            duration: 0.100,
            delay: 0.140
        })

        await GameUtils.wait(240)
        this.removeChild(this.explosion)
        this.explosion.destroy()
    }
}