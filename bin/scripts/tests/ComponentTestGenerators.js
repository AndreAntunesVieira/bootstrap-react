const fs = require('fs-extra')

function generateMissingComponentsTests(){
  const components = readRecursive('components')
  const tests = readRecursive('__tests__/components')
  const covered = tests.map(file => file.replace('__tests__/', '').replace('Test.js', '.js'))

  const uncovered = components.filter(file => !covered.includes(file))

  const testContents = uncovered.map(generateTestContent)
  testContents.map(({ file, content }) => {
    fs.outputFileSync(file, content)
  })
}


module.exports = {
  generateMissingComponentsTests
}


function readRecursive(path, head = true){
  const all = fs.readdirSync(path)
  const rootFiles = all.filter(row => (/(\.js|\.jsx)$/.test(row)))
  const files = head ? rootFiles.map(row => `${path}/${row}`) : rootFiles
  const folders = all.filter(row => (!/(\.js|\.jsx)$/.test(row)))
  folders.forEach(row => {
    const subFiles = readRecursive(`${path}/${row}`, false)
    subFiles.forEach(file => files.push(`${path}/${row}/${file}`))
  })
  return files
}


function generateTestContent(file){
  const path = file.replace('.js', '')
  const name = path.split('/').pop()

  const content = `import React from 'react'
import { shallow } from 'enzyme'
import ${name} from '${path}'


test('<${name} /> should render', () => {
  const wrapper = shallow(<${name} />)
  expect(wrapper.html()).not.toBeNull()
})
`
  return { content, file: '__tests__/'+file.replace('.js', 'Test.js') }
}
