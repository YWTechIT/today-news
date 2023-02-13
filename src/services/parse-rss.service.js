import Parser from 'rss-parser'

export async function parseRss() {
  const parser = new Parser()
  const feed = await parser.parseURL(process.env.RSS_URL)

  console.log('feed :>> ', feed)
}
