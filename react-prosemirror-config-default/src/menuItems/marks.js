import { toggleMark } from 'prosemirror-commands'
import { markActive, promptForURL } from './helpers';
import icons from '../icons'

const htmlSpecific = (schema) => {
  return {
    subscript: {
      title: 'Toggle subscript',
      content: icons.subscript,
      active: markActive(schema.marks.subscript),
      run: toggleMark(schema.marks.subscript)
    },
    superscript: {
      title: 'Toggle superscript',
      content: icons.superscript,
      active: markActive(schema.marks.superscript),
      run: toggleMark(schema.marks.superscript)
    },
    underline: {
      title: 'Toggle underline',
      content: icons.underline,
      active: markActive(schema.marks.underline),
      run: toggleMark(schema.marks.underline)
    },
    strikethrough: {
      title: 'Toggle strikethrough',
      content: icons.strikethrough,
      active: markActive(schema.marks.strikethrough),
      run: toggleMark(schema.marks.strikethrough)
    }
  }
}

const generic = (schema) => {
  return {
    em: {
      title: 'Toggle emphasis',
      content: icons.em,
      active: markActive(schema.marks.em),
      run: toggleMark(schema.marks.em)
    },
    strong: {
      title: 'Toggle strong',
      content: icons.strong,
      active: markActive(schema.marks.strong),
      run: toggleMark(schema.marks.strong)
    },
    code: {
      title: 'Toggle code',
      content: icons.code,
      active: markActive(schema.marks.code),
      run: toggleMark(schema.marks.code)
    },
    link: {
      title: 'Add or remove link',
      content: icons.link,
      active: markActive(schema.marks.link),
      enable: state => !state.selection.empty,
      run (state, dispatch) {
        if (markActive(schema.marks.link)(state)) {
          toggleMark(schema.marks.link)(state, dispatch)
          return true
        }

        const href = promptForURL()
        if (!href) return false

        toggleMark(schema.marks.link, { href })(state, dispatch)
        // view.focus()
      }
    }
  }
}

export default { generic, htmlSpecific }
