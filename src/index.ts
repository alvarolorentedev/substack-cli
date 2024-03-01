import { program } from 'commander'
import { init } from './init'
//@ts-ignore
import * as Configstore from 'configstore'
import { readFileSync } from 'fs'
import { retrieve } from './subscribers'

const packageJson = JSON.parse(readFileSync(__dirname + '/../package.json', 'utf8'))
const config = new Configstore(packageJson.name, {})

program.name('substack').description('CLI for substack').version(packageJson.version)

program
  .command('init')
  .description('initialize substack cli')
  .requiredOption('-c, --cookie <value>', 'substack cookie, this is a required parameter')
  .option('-d, --domain <value>', 'substack domain, this is a required for some actions like retrieving subscribers')
  .action((opts) => init(opts, config))

program
  .command('subscribers')
  .description('retrieve subscribers')
  .action((_: any) => retrieve(undefined, config) as any)

program.parse(process.argv)
