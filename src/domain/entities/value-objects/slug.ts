export class Slug {
  public text: string

  constructor(text: string) {
    this.text = text
  }

  /**
   * Receives an string and normalize it as an slug.
   *
   * @example "An example title" => "an-example-title"
   *
   * @param text
   */
  static createFromText(text: string) {
    const slug = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slug)
  }
}
