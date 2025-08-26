export class CustomTag {
  private constructor(private readonly value: string) {}

  public static create(tag: string): CustomTag {
    if (!tag || tag.trim().length === 0) {
      throw new Error('CustomTag não pode ser vazio');
    }
    if (tag.length > 25) {
      throw new Error('CustomTag muito longo');
    }
    return new CustomTag(tag.trim());
  }

  public getValue(): string {
    return this.value;
  }
}
