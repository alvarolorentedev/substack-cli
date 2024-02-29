export const init = async (config: any) => {
  try {
    if (!process.env['SUBSTACK_COOKIE']) console.error('unable to find cookie in SUBSTACK_COOKIE environment variable')

    config.set('cookie', process.env['SUBSTACK_COOKIE'])
  } catch (err) {
    console.error('Authentication failed', err)
  }
}
