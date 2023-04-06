import { sound, IMediaInstance } from "@pixi/sound"

export class SoundController {
    static loop: IMediaInstance | Promise<IMediaInstance>

    static play(_name: string) {
        sound.play(_name)
    }

    static playBGMusic() {
        sound.play("loop", { loop: true, volume: 0.8 })
    }
}