import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { columnResizing, tableEditing } from 'prosemirror-tables'
import { placeholder } from '@aeaton/prosemirror-placeholder'
import { footnotes } from '@aeaton/prosemirror-footnotes'

import 'prosemirror-tables/style/tables.css'
import 'prosemirror-gapcursor/style/gapcursor.css'

import keys from './keys'
import rules from './rules'

class PluginBuilder {
  constructor(docType, schema) {
    this.docType = docType;
    this.schema = schema;
  }

  build() {
    let plugins = [
      keys(this.docType, this.schema),
      history(),
      placeholder({ content: 'Start typing…'}),
      dropCursor(),
      gapCursor()
    ]

    if(this.docType === 'html') {
      plugins.concat([
        rules,
        footnotes(),
        columnResizing(),
        tableEditing()
      ])

      // for tables
      document.execCommand('enableObjectResizing', false, false)
      document.execCommand('enableInlineTableEditing', false, false)
    }

    return plugins
  }
}

export default (docType, schema) => new PluginBuilder(docType, schema).build();
