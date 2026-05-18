import { useEffect, useState } from "react";
import { supabase } from "@/shared/api/supabase";

type Status = "loading" | "success" | "error";

export const useConfirmEmail = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (event, session) => {

        // SOLO confirmación real de email
        if (event === "SIGNED_IN" && session) {
          setStatus("success");

          // cerrar sesión después de confirmar
          await supabase.auth.signOut();
        }
      });

    const timeout = setTimeout(() => {
      setStatus("error");
      setError("El link de confirmación es inválido o ha expirado.");
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return { status, error };
};