import React, { Fragment } from 'react'
import { css } from 'glamor'
import { ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import { Editorial, colors, fontStyles } from '@project-r/styleguide'

import parliamentarians from './data/parliamentarians.json'

import ColorLegend from './ColorLegend'

const PORTAITS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/lobbywatch-widgets/portraits'

const PADDING = 10

const styles = {
  tableContainer: css({
    overflowX: 'auto',
    overflowY: 'hidden',
    marginLeft: -PADDING,
    marginRight: -PADDING
  }),
  table: css({
    ...fontStyles.sansSerifRegular,
    borderSpacing: '0',
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: '100%'
  }),
  td: css({
    textAlign: 'left',
    verticalAlign: 'top',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: PADDING,
    paddingRight: PADDING
  }),
  portrait: css({
    width: 45,
    height: 45,
    borderRadius: '50%',
    float: 'left'
  }),
  color: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: 8,
    height: 8,
    marginLeft: 4
  })
}

const Table = ({ title, lead, sources, data, labels }) => {

  const rows = data.map(d => ({
    ...d,
    parliamentarian: (
      d.parliamentId && parliamentarians.find(p => p.parliamentId === d.parliamentId) ||
      parliamentarians.find(p => p.name === d.name) ||
      parliamentarians.find(p => p.name === d.name.split(' ').reverse().join(' '))
    )
  }))

  const labelIndex = labels.reduce(
    (index, label) => {
      index[label.value] = label
      return index
    },
    {}
  )

  return <>
    {title && <ChartTitle>{title}</ChartTitle>}
    {lead && <ChartLead>{lead}</ChartLead>}
    <ColorLegend values={labels} />
    <div {...styles.tableContainer}>
      <table {...styles.table}>
        {rows.map((row, i) => {
          const parliamentarian = row.parliamentarian
          return <tr key={parliamentarian ? parliamentarian.id : i}>
            <td {...styles.td}>
              {parliamentarian &&
                <img {...styles.portrait} src={`${PORTAITS_BASE_URL}/${parliamentarian.parliamentId}`} alt='Porträtbild' />}
              {row.name || parliamentarian.name}<br />
              {[
                parliamentarian && parliamentarian.partyMembership.party.abbr,
                parliamentarian && parliamentarian.canton,
                row.secondaryLabel
              ].filter(Boolean).join(', ')}
            </td>
            <td {...styles.td} style={{
              verticalAlign: 'top',
              textAlign: 'right'
            }}>
              {row.values && row.values.map(value => {
                const label = labelIndex[value]
                if (!label) {
                  return value
                }
                return <span {...styles.color} style={{
                  backgroundColor: label.color
                }} />
              })}
            </td>
          </tr>
        })}
      </table>
    </div>

    {sources && <Editorial.Note style={{ marginTop: 10 }}>
      {sources.map(({ prefix, text, href }, i) => <Fragment key={i}>
        {prefix}
        {href
          ? <Editorial.A href={href}>{text}</Editorial.A>
          : text}
      </Fragment>)}
    </Editorial.Note>}
  </>
}

export default Table
