export class SearchableText {
  //TODO rename file
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
   * Example: "An example title" and "An example title" => "anexampletitle"
   *
   * @param text (string)
   */

  static createFromText(text: string) {
    const normalizedForSearch = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();

    return new SearchableText(normalizedForSearch);
  }
}
