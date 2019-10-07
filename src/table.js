import React, { Fragment } from 'react'
import { css } from 'glamor'
import { ChartTitle, ChartLead } from '@project-r/styleguide/chart'
import { Editorial, colors, fontStyles } from '@project-r/styleguide'

import parliamentarians from './data/parliamentarians.json'

import ColorLegend, { SIZE as COLOR_SIZE } from './ColorLegend'

const PORTAITS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/lobbywatch-widgets/portraits'

const PADDING = 10

const styles = {
  tableContainer: css({
    marginTop: 10,
    marginBottom: 20,
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
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: '50%',
    float: 'left'
  }),
  color: css({
    display: 'inline-block',
    borderRadius: '50%',
    width: COLOR_SIZE,
    height: COLOR_SIZE,
    marginLeft: 4
  })
}

const Table = ({ title, lead, sources, data, labels, labelTitle }) => {

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
    <ColorLegend title={labelTitle} inline values={labels} />
    <div {...styles.tableContainer}>
      <table {...styles.table}>
        {rows.map((row, i) => {
          const parliamentarian = row.parliamentarian
          return <tr key={parliamentarian ? parliamentarian.id : i} style={{
            background: i % 2 ? colors.secondaryBg : undefined
          }}>
            <td {...styles.td}>
              {parliamentarian &&
                <img {...styles.portrait} src={`${PORTAITS_BASE_URL}/${parliamentarian.parliamentId}.jpg`} alt='Porträtbild' />}
              {parliamentarian
                ? <Editorial.A
                  href={`https://lobbywatch.ch/de/daten/parlamentarier/${parliamentarian.id.split('-').pop()}/${encodeURIComponent(parliamentarian.name)}`}
                  title='Interessenbindungen auf lobbywatch.ch'>
                    {parliamentarian.name}
                </Editorial.A>
                : row.name}
              <br />
              {[
                parliamentarian && parliamentarian.partyMembership ? parliamentarian.partyMembership.party.abbr : 'Parteilos',
                parliamentarian && parliamentarian.canton,
                row.secondaryLabel
              ].filter(Boolean).join(', ')}
            </td>
            <td {...styles.td} style={{
              verticalAlign: 'middle',
              textAlign: 'center'
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
