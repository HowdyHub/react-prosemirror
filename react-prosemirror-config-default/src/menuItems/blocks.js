import { joinUp, lift, setBlockType, wrapIn } from 'prosemirror-commands'
import { wrapInList } from 'prosemirror-schema-list'
import { blockActive } from './helpers';
import icons from '../icons'

const htmlSpecific = (schema) => {}
const generic = (schema) => {
  return {
    plain: {
      title: 'Change to paragraph',
      content: icons.paragraph,
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph)
    },
    code_block: {
      title: 'Change to code block',
      content: icons.code_block,
      active: blockActive(schema.nodes.code_block),
      enable: setBlockType(schema.nodes.code_block),
      run: setBlockType(schema.nodes.code_block)
    },
    h1: {
      title: 'Change to heading level 1',
      content: 'H1',
      active: blockActive(schema.nodes.heading, { level: 1 }),
      enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: setBlockType(schema.nodes.heading, { level: 1 })
    },
    h2: {
      title: 'Change to heading level 2',
      content: 'H2',
      active: blockActive(schema.nodes.heading, { level: 2 }),
      enable: setBlockType(schema.nodes.heading, { level: 2 }),
      run: setBlockType(schema.nodes.heading, { level: 2 })
    },
    h3: {
      title: 'Change to heading level 3',
      content: 'H3',
      active: blockActive(schema.nodes.heading, { level: 3 }),
      enable: setBlockType(schema.nodes.heading, { level: 3 }),
      run: setBlockType(schema.nodes.heading, { level: 3 })
    },
    h4: {
      title: 'Change to heading level 4',
      content: 'H4',
      active: blockActive(schema.nodes.heading, { level: 4 }),
      enable: setBlockType(schema.nodes.heading, { level: 4 }),
      run: setBlockType(schema.nodes.heading, { level: 4 })
    },
    blockquote: {
      title: 'Wrap in block quote',
      content: icons.blockquote,
      active: blockActive(schema.nodes.blockquote),
      enable: wrapIn(schema.nodes.blockquote),
      run: wrapIn(schema.nodes.blockquote)
    },
    bullet_list: {
      title: 'Wrap in bullet list',
      content: icons.bullet_list,
      active: blockActive(schema.nodes.bullet_list),
      enable: wrapInList(schema.nodes.bullet_list),
      run: wrapInList(schema.nodes.bullet_list)
    },
    ordered_list: {
      title: 'Wrap in ordered list',
      content: icons.ordered_list,
      active: blockActive(schema.nodes.ordered_list),
      enable: wrapInList(schema.nodes.ordered_list),
      run: wrapInList(schema.nodes.ordered_list)
    },
    lift: {
      title: 'Lift out of enclosing block',
      content: icons.lift,
      enable: lift,
      run: lift
    },
    join_up: {
      title: 'Join with above block',
      content: icons.join_up,
      enable: joinUp,
      run: joinUp
    }
  }
}

export default { generic, htmlSpecific }
