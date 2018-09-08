const fs = require('fs')
const environment = process.env.NODE_ENV || 'development'
const defaultEnvironmentVars = require('../../defaultEnvs')[environment]

const parsedEnvs = Object
  .entries(defaultEnvironmentVars)
  .map(rewriteWithMachineEnvVars)

let content = parsedEnvs
  .filter(([name]) => name.substr(0, 3) !== 'FT_')
  .map(transformToRowsToWrite)
  .join('\n')

content += '\nwindow.FEATURE_TOGGLES = {\n  '
content += parsedEnvs
  .filter(([name]) => name.substr(0, 3) === 'FT_')
  .map(([name, value]) => `${name}: ${value}`)
  .join(',\n  ')
content += '\n};'

fs.writeFile('env.js', content, (e) => {
  const { red, green, end } = specialConsoleCommands()
  if (e) return process.stdout.write(`${red}Erro ao salvar variáveis de ambiente!${end}`)
  return process.stdout.write(`${green}Variáveis de ambiente salvas com sucesso${end}`)
})

function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function rewriteWithMachineEnvVars ([name, value]) {
  const importantValue = process.env[name] === undefined ? value : process.env[name]
  return [name, transformTypes(importantValue, name)]
}

function transformTypes (value, name) {
  if (name === 'API_URL') {
    return `"${ensureSlashAfter(value)}"`
  }
  if (value === true || value === false) {
    return eval(value)
  }
  if (value === 'true' || value === 'false' || isNumeric(value)) {
    return value
  }
  return `"${value}"`
}

function transformToRowsToWrite ([name, value]) {
  return `window.${name} = ${value};`
}

function specialConsoleCommands () {
  return {
    red: '\x1b[31m',
    green: '\x1b[32m',
    end: '\x1b[0m\n\n',
  }
}

function ensureSlashAfter (str) {
  if (str.substr(str.length - 1, 1) === '/') {
    return str
  }
  return `${str}/`
}
