import {Rectangle} from "pixi.js"

export class GameArea extends Rectangle {
    private static_width: number = 812
    private static_height: number = 375
    public scale: number = 1
    public orient: OrientationType = "landscape-primary"

    constructor() {
        super()
    }

    public resize(screenWidth: number, screenHeight: number) {
        if (screenWidth > screenHeight) {
            this.scale = Math.min(screenWidth / this.static_width, screenHeight / this.static_height)
            this.orient = "landscape-primary"
        } else {
            this.scale = Math.min(screenWidth / this.static_height, screenHeight / this.static_width)
            this.orient = "portrait-primary"
        }
        let bigW = Math.round(screenWidth / this.scale)
        let bigH = Math.round(screenHeight / this.scale)

        this.x = 0
        this.y = 0
        this.width = bigW
        this.height = bigH

        if (this.orient === "landscape-primary") {
            if (this.width > this.static_width) {
                this.x = Math.floor((this.width - this.static_width) / 2)
                this.width = this.static_width
            }
            if (this.height > this.static_height) {
                this.y = Math.floor((this.height - this.static_height) / 2)
                this.height = this.static_height
            }
        } else {
            if (this.height > this.static_width) {
                this.y = Math.floor((this.height - this.static_width) / 2)
                this.height = this.static_width
            }
            if (this.width > this.static_height) {
                this.x = Math.floor((this.width - this.static_height) / 2)
                this.width = this.static_height
            }
        }
    }
}