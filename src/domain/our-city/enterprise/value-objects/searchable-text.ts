export class SearchableText {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(title: string) {
    return new SearchableText(title);
  }

  /**
   * Receive a string and normalize it as a search title
   *
   * Example: "An example title" or "AnExampleTitle" => "an-example-title"
   *
   * @param text (string)
   */

  static createFromText(text: string) {
    const normalizedForSearch = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();

    return new SearchableText(normalizedForSearch);
  }
}
