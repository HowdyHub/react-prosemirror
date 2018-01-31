import { redo, undo } from 'prosemirror-history'
import icons from '../icons'

const htmlSpecific = (schema) => {}

const generic = (schema) => {
  return {
    undo: {
      title: 'Undo last change',
      content: icons.undo,
      enable: undo,
      run: undo
    },
    redo: {
      title: 'Redo last undone change',
      content: icons.redo,
      enable: redo,
      run: redo
    }
  }
}

export default { generic, htmlSpecific }
