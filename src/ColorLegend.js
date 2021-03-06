import React from 'react'
import PropTypes from 'prop-types'
import { css, merge } from 'glamor'

import { fontStyles, colors } from '@project-r/styleguide'

export const SIZE = 10

const styles = {
  container: css({
    marginBottom: 10
  }),
  inlineContainer: css({
    marginBottom: 0,
    lineHeight: '12px'
  }),
  title: css({
    ...fontStyles.sansSerifMedium12,
    color: colors.text
  }),
  label: css({
    display: 'block',
    ...fontStyles.sansSerifRegular12,
    color: colors.text,
    fontFeatureSettings: '"tnum" 1, "kern" 1'
  }),
  labelWithColor: css({
    paddingLeft: SIZE + 4,
    position: 'relative'
  }),
  inlineLabel: css({
    display: 'inline-block',
    marginRight: SIZE + 4
  }),
  color: css({
    position: 'absolute',
    left: 0,
    top: 12 - SIZE,
    width: SIZE,
    height: SIZE
  }),
  circle: css({
    borderRadius: '50%',
  })
}

const ColorValue = ({ shape = 'circle', inline, color, label }) =>
  <span {...merge(styles.label, inline && styles.inlineLabel, !!color && styles.labelWithColor)}>
    {!!color && (
      <span
        {...merge(styles.color, styles[shape === 'square' ? 'square' : 'circle'])}
        style={{backgroundColor: color}} />
    )}
    {label}{label && ' '}
  </span>

const ColorLegend = ({title, shape, values, maxWidth, inline}) => {
  if (!values.length && !title) {
    return null
  }
  return (
    <div {...merge(styles.container, inline && styles.inlineContainer)} style={{maxWidth}}>
      {!!title && <div {...styles.title}>{title}</div>}
      {
        values.map((value, i) => {
          return (
            <ColorValue key={i} {...value} inline={inline} shape={shape} />
          )
        })
      }
    </div>
  )
}

ColorValue.propTypes = {
  shape: PropTypes.oneOf(['square', 'circle']),
  color: PropTypes.string
}

ColorLegend.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  values: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
  })),
  maxWidth: PropTypes.number,
  inline: PropTypes.bool
}

export default ColorLegend
