import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthData {
  name: string;
  token: string;
}
interface IContext {
  status: "logged-in" | "logged-out" | "pending";
  setupLogin: (data: AuthData) => void;
  authData: AuthData | null;
}

const context = createContext<IContext>({
  status: "pending",
  setupLogin: () => {},
  authData: null,
});

export const AuthProvider = ({ children }: any) => {
  const [status, setStatus] = useState<IContext["status"]>("pending");
  const [authData, setAuthData] = useState<AuthData | null>(null);

  const setupLogin = useCallback((data: AuthData) => {
    localStorage.setItem("authData", JSON.stringify(data));
    setAuthData(data);
    setStatus("logged-in");
  }, []);

  const verifyAuth = useCallback(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      setAuthData(JSON.parse(authData));
      setStatus("logged-in");
    } else {
      setStatus("logged-out");
    }
  }, []);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <context.Provider
      value={{
        status,
        setupLogin,
        authData,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAuth = () => useContext(context);
