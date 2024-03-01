import substack from 'substack-sdk'
import { prompt } from 'inquirer'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { json2csv } from 'json-2-csv'

const batchSize = 100
export const retrieve = async (_: any, config: any) => {
  try {
    const cookie = config.get('cookie')
    const domain = config.get('domain')
    substack.init(cookie, domain)
    const context = await substack.subscribers.retrieve(1, 0)
    const subscriberCount = context.count
    const batches = Math.ceil(subscriberCount / batchSize)
    let subscribers: any[] = []
    const parameters = await prompt([
      {
        type: 'checkbox',
        name: 'fields',
        message: 'fields to export',
        choices: Object.keys(context.subscribers[0]).map((key) => ({
          value: key,
          checked: true,
        })),
      },
      {
        type: 'list',
        name: 'exportType',
        message: 'what will be the export format?',
        default: 'csv',
        choices: ['csv', 'json'],
      },
      {
        type: 'input',
        name: 'path',
        message: 'Where do you want to save this?',
        default: process.cwd(),
      },
      {
        type: 'input',
        name: 'name',
        message: 'what is the file name?',
        default: 'subscribers',
      },
    ])
    for (let batchNumber = 0; batchNumber < batches; ++batchNumber) {
      const batch = await substack.subscribers.retrieve(batchSize, batchNumber * batchSize)
      subscribers = subscribers.concat(batch.subscribers)
    }
    const subscriberList = subscribers.map((sub) =>
      parameters.fields.reduce((acc: any, value: any) => ({ ...acc, [value]: sub[value] }), {}),
    )
    const content = parameters.exportType === 'csv' ? json2csv(subscriberList) : JSON.stringify(subscriberList, null, 2)
    writeFileSync(join(parameters.path, `${parameters.name}.${parameters.exportType}`), content)
  } catch (err) {
    console.error('Initialization failed', err)
  }
}
