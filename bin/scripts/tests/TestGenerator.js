const fs = require('fs-extra')

if(!process.argv[2]){
  throw new Error('You need to declare a path')
}

generateMissingComponentsTests()

function generateMissingComponentsTests(){
  const components = readRecursive(process.argv[2])
  const tests = readRecursive('__tests__/'+process.argv[2])
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
  const content = testContent(path, name)
  return { content, file: '__tests__/'+file.replace('.js', 'Test.js') }
}

function isComponentFile(file){
  return /^components\/.*/.test(file)
}

function testContent(path, name){
  if(isComponentFile(path)) return componentTestContent(path, name)
  return defaultTestContent(path, name)
}

function componentTestContent(path, name){
  return `import React from 'react'
import { shallow } from 'enzyme'
import ${name} from '${path}'

test('<${name} /> should break', () => {
  const wrapper = shallow(<${name} />)
  expect(false).toBe(true)
})
`
}

function defaultTestContent(path, name){
  return `import React from 'react'
import { shallow } from 'enzyme'
import ${name} from '${path}'

test('${name} should break', () => {
  expect(false).toBe(true)
})
`
}
