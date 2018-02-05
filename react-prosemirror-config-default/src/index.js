// An example setup, adapted from prosemirror-example-setup

import plugins from './plugins'
import htmlSchema from './schema'
import { schema as markdownSchema, defaultMarkdownParser, defaultMarkdownSerializer } from 'prosemirror-markdown'

const schemas = {
  markdown: markdownSchema,
  html:     htmlSchema
}

export const options = ({ docType = 'html', customSchema = null } = {}) => {
  const schema = customSchema || schemas[docType]

  return {
    plugins: plugins(docType, schema),
    schema
  }
}

import menuBuilder from './menu';
export const menu = ({ docType = 'html', options = {}, customSchema = null } = {}) => {
  const schema = customSchema || schemas[docType]

  return menuBuilder(docType, schema, options)
}

export { defaultMarkdownParser, defaultMarkdownSerializer }
