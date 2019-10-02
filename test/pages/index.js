import React from 'react'

import { parse } from '@orbiting/remark-preset'
import createSchema from '@project-r/styleguide/lib/templates/Article'

import Render from '../components/Render'
// import md from '../../../../Articles/article-x/article.md'
import md from '../article.md'

const schema = createSchema()
const mdast = parse(md)

export default () => <Render mdast={mdast} schema={schema} />
