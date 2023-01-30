class LocaleStorageService_ {
  saveToLS(key, value) {
    const jsonFormat = JSON.stringify(value);
    localStorage.setItem(key, jsonFormat);
  }
  loadFromLS(key) {
    const data = localStorage.getItem(key);
    try {
      const result = JSON.parse(data);
      return result;
    } catch {
      return data;
    }
  }
}
export const LocaleStorageService = new LocaleStorageService_();
