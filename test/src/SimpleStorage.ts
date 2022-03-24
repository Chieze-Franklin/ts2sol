class SimpleStorage {
  storedData: number;

  get StoredData() {
    return this.storedData;
  }

  /**
   * Represents a book.
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  set StoredData(value: number) {
    this.storedData = value;
  }
}
