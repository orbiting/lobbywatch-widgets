import React from 'react'

import { renderMdast } from 'mdast-react-render'
import visit from 'unist-util-visit'

const Render = ({ mdast, schema }) => {
  const jsUrl = require('file-loader!../../build/table.js')

  visit(mdast, 'zone', node => {
    if (node.identifier === 'DYNAMIC_COMPONENT' && node.data.src.match(/\/table\.js/)) {
      node.data.src = '/build/table.js' +
        '?u=' + encodeURIComponent(jsUrl)
    }
  })

  return <div key={jsUrl}>
    {renderMdast(mdast, schema)}
  </div>
}

export default Render
