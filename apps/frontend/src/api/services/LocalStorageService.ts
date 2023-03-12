export default class LocalStorageService {
  static setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  static cleanToken(): void {
    this.setToken('');
  }

  static getToken(): string {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.setToken('');
    }
    return token!;
  }

  static checkIfTokenExist(): boolean {
    const token = this.getToken();
    if (token === null) return false;
    return !(token === '');
  }
}
