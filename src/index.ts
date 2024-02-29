import { program } from 'commander'
import { init } from './init'
//@ts-ignore
import * as Configstore from 'configstore'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync(__dirname + '/../package.json', 'utf8'))
const config = new Configstore(packageJson.name, {})

program.name('substack-cli').description('CLI for substack').version(packageJson.version)

program
  .command('init')
  .description('initialize substack cli')
  .action(() => init(config))

/*program
  .command('subscribers')
  .description('retrieve subscribers')
  .option(
    '-n, --name <name>',
    'Name of the application. If unspecified, the application described in the current directory package.json.',
  )
  .action((opts) => deleteDeployment(opts, config) as any)*/

program.parse(process.argv)
