import { supabase } from "@/shared/api/supabase";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const redirectTo = `${typeof window !== "undefined" ? window.location.origin : ""}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo,
      });

      if (error) throw error;
      return normalizedEmail;
    },
  });
};
