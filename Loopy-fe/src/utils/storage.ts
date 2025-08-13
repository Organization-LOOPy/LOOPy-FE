class Storage {
  static getAccessToken = () => {
    return localStorage.getItem('accessToken') ?? undefined;
  };

  static setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
  };

  static getNickname = () => {
    return localStorage.getItem('nickname') ?? undefined;
  };

  static setNickname = (nickname: string) => {
    localStorage.setItem('nickname', nickname);
  };

  static clearStorage = () => {
    localStorage.clear();
  };
}

export default Storage;
