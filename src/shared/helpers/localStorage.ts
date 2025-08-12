const LocalStorageHelper = {
  getStorageValue: <T>(key: string): T | null => {
    const v = localStorage.getItem(key);
    if (!v) return null;
    return JSON.parse(v) as T;
  },
};

export default LocalStorageHelper;
