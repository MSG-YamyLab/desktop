declare global {
    interface Window {
      electronAPI: {
        setTokens: (accessToken: string, refreshToken: string) => void;
      };
    }
  }
  
  export {};