import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { Alert } from "react-native";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: false,
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data);
      }
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setProfile(null);
      }
      fetchSession();
      setLoading(false);
    });

    fetchSession();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      try {
        if (!session?.user) throw new Error("No user on the session!");

        const { data, error, status } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    };

    fetchProfile();
  }, [session?.user]);

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user, profile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
