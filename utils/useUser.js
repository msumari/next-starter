import { useState, useEffect } from "react";
import { supabase } from "./initSupa";

const useUser = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    setUser(supabase.auth.user());
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Auth state changed: ${event}`);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);
  return { user, session };
};

export { useUser };
