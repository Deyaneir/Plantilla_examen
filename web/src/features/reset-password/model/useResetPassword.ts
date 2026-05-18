import { supabase } from "@/shared/api/supabase";
import { useEffect, useState } from "react";

type Status = "loading" | "ready" | "updating" | "success" | "error";

export const useResetPassword = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();

      // 🔥 SI HAY SESSION = recovery activo
      if (data.session) {
        setStatus("ready");
      } else {
        setStatus("error");
        setError("Link inválido o expirado");
      }
    };

    init();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setStatus("ready");
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const updatePassword = async (newPassword: string) => {
    setStatus("updating");

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
      setStatus("ready");
      return;
    }

    await supabase.auth.signOut();
    setStatus("success");
  };

  return { status, error, updatePassword };
};