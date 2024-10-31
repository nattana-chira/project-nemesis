import DrawCard from '../audio/drawcard.m4a'
import Cursor1 from '../audio/Cursor1.m4a'
import Open1 from '../audio/Open1.m4a'

const volume = 0.25

export default class PlayAudio {
  static buildSound = (soundFile) => {
    const sound = new Audio(soundFile);
    const _sound = sound.cloneNode(true)
    _sound.volume = volume
    return _sound
  }

  static drawCard = () => {
    PlayAudio.play(drawCard)
  }

  static click = () => {
    PlayAudio.play(click)
  }

  static open = () => {
    PlayAudio.play(open)
  }

  static play(soundObj) {
    try {
      soundObj.play().catch(error => console.error('Error playing audio: ', error))
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  }
}

const drawCard = PlayAudio.buildSound(DrawCard)
const click = PlayAudio.buildSound(Cursor1)
const open = PlayAudio.buildSound(Open1)