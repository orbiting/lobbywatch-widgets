#!/usr/bin/env node

const rw = require('rw')
const { execSync } = require('child_process')

const contents = JSON.parse(rw.readFileSync('/dev/stdin', 'utf8'))

contents.data.parliamentarians.forEach((parliamentarian) => {
  execSync(
    `curl -o ./portraits/${parliamentarian.parliamentId}.jpg ${parliamentarian.portrait}`,
    {stdio: 'inherit'}
  )
})

rw.writeFileSync(
  '/dev/stdout',
  JSON.stringify(contents.data.parliamentarians, null, 2),
  'utf8'
)
