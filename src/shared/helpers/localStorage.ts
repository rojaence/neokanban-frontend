const LocalStorageHelper = {
  getItem: <T>(key: string): T | null => {
    const v = localStorage.getItem(key);
    if (!v) return null;
    return JSON.parse(v) as T;
  },

  setItem: <T>(key: string, payload: T) => {
    localStorage.setItem(key, JSON.stringify(payload));
  },
};

export default LocalStorageHelper;
