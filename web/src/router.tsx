import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ConfirmEmailPage } from "./pages/confirm-email/ui/ConfirmEmailPage";
import { ResetPasswordPage } from "./pages/reset-password/ui/ResetPasswordPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/confirm-email"
          element={<ConfirmEmailPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/confirm-email"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};