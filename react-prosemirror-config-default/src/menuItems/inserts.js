import { canInsert, promptForURL } from './helpers';
import icons from '../icons'

const htmlSpecific = (schema) => {
  return {
    footnote: {
      title: 'Insert footnote',
      content: icons.footnote,
      enable: canInsert(schema.nodes.footnote),
      run: (state, dispatch) => {
        const footnote = schema.nodes.footnote.create()
        dispatch(state.tr.replaceSelectionWith(footnote))
      }
    },
    table: {
      title: 'Insert table',
      content: icons.table,
      enable: canInsert(schema.nodes.table),
      run: (state, dispatch) => {
        // const { from } = state.selection
        let rowCount = window && window.prompt('How many rows?', 2)
        let colCount = window && window.prompt('How many columns?', 2)

        const cells = []
        while (colCount--) {
          cells.push(schema.nodes.table_cell.createAndFill())
        }

        const rows = []
        while (rowCount--) {
          rows.push(schema.nodes.table_row.createAndFill(null, cells))
        }

        const table = schema.nodes.table.createAndFill(null, rows)
        dispatch(state.tr.replaceSelectionWith(table))

        // const tr = state.tr.replaceSelectionWith(table)
        // tr.setSelection(Selection.near(tr.doc.resolve(from)))
        // dispatch(tr.scrollIntoView())
        // view.focus()
      }
    }
  }
}

const generic = (schema) => {
  const addImage = (dispatch, state, src) => {
    const img = schema.nodes.image.createAndFill({ src })
    dispatch(state.tr.replaceSelectionWith(img))
  };

  return {
    image: {
      title: 'Insert image',
      content: icons.image,
      enable: canInsert(schema.nodes.image),
      run: (state, dispatch, refs) => {
        promptForURL(refs, 'imagePrompt', (src) => {
          addImage(dispatch, state, src);
        });
      }
    },
    // hr: {
    //   title: 'Insert horizontal rule',
    //   content: 'HR',
    //   enable: canInsert(schema.nodes.horizontal_rule),
    //   run: (state, dispatch) => {
    //     const hr = schema.nodes.horizontal_rule.create()
    //     dispatch(state.tr.replaceSelectionWith(hr))
    //   }
    // },
  }
}

export default { generic, htmlSpecific }
