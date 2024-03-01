export const init = async (opts: any, config: any) => {
  try {
    console.log(opts)

    config.set('cookie', opts.cookie)
    config.set('domain', opts.domain)
  } catch (err) {
    console.error('Initialization failed', err)
  }
}
