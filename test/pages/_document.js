import Document, {
  Head,
  Main,
  NextScript
} from 'next/document'
import { renderStaticOptimized } from 'glamor/server'
import { fontFaces } from '@project-r/styleguide'

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage, pathname }) {
    const page = renderPage()
    const styles = renderStaticOptimized(() => page.html)
    return {
      ...page,
      ...styles,
      env: require('../lib/constants')
    }
  }
  constructor (props) {
    super(props)
    const { __NEXT_DATA__, env } = props
    if (env) {
      __NEXT_DATA__.env = this.props.env
    }
  }
  render () {
    const { css, env: {
      PIWIK_URL_BASE, PIWIK_SITE_ID, PUBLIC_BASE_URL
    } } = this.props
    const piwik = (
      !!PIWIK_URL_BASE &&
      !!PIWIK_SITE_ID
    )
    return (
      <html lang='de'>
        <Head>
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1'
          />
          <meta
            httpEquiv='X-UA-Compatible'
            content='IE=edge'
          />
          <style
            dangerouslySetInnerHTML={{
              __html: fontFaces() + 'body {margin: 0;}'
            }}
          />
          {css
            ? <style
              dangerouslySetInnerHTML={{ __html: css }}
            />
            : null}
          <meta name='author' content='Republik' />
          <meta name='referrer' content='no-referrer' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}