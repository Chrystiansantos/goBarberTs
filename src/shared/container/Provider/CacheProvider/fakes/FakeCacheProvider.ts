import ICacheProvider from '../model/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async invalidate(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );
    keys.forEach(key => delete this.cache[key]);
  }

  public async invalidatePrefix(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const data = JSON.parse(this.cache[key]);

    if (!data) return null;
    return data as T;
  }
}
