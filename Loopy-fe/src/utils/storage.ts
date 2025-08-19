class Storage {
  static getAccessToken = () => {
    return localStorage.getItem("accessToken") ?? undefined;
  };

  static setAccessToken = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  };

  static getNickname = () => {
    return localStorage.getItem("nickname") ?? undefined;
  };

  static setNickname = (nickname: string) => {
    localStorage.setItem("nickname", nickname);
  };

  static getRole = () => {
    return localStorage.getItem("role") ?? undefined;
  };

  static setRole = (role: string) => {
    localStorage.setItem("role", role);
  };

  static isOnboarded = () => localStorage.getItem("isOnboarded") === "true";
  static setOnboarded = (done: boolean) => localStorage.setItem("isOnboarded", String(done));

  static getActiveCafeId = () => {
    const cafeId = localStorage.getItem("activeCafeId");
    return cafeId ? Number(cafeId) : undefined;
  };

  static setActiveCafeId = (id: number) => {
    localStorage.setItem("activeCafeId", String(id));
  };

  static clearStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("role");
    localStorage.removeItem("isOnboarded");
  };
}

export default Storage;
