import type { CSSProperties } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmEmail } from "../../../features/confirm-email/model/useConfirmEmail";

const isRecoveryLink = (location: ReturnType<typeof useLocation>) => {
  const hash = location.hash.startsWith("#")
    ? location.hash.slice(1)
    : location.hash;
  const hashParams = new URLSearchParams(hash);
  const queryParams = new URLSearchParams(location.search);
  const type = hashParams.get("type") ?? queryParams.get("type");
  return type === "recovery";
};

export const ConfirmEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRecovery = isRecoveryLink(location);
  const { status, error } = useConfirmEmail();

  useEffect(() => {
    if (isRecovery) {
      navigate(`/reset-password${location.search}${location.hash}`, {
        replace: true,
      });
    }
  }, [isRecovery, location.search, location.hash, navigate]);

  if (isRecovery) {
    return (
      <main style={layout}>
        <div style={card}>
          <div style={header}>
            <span style={{ fontSize: "42px" }}>🔁</span>
            <h1 style={{ color: "#fff", margin: "8px 0 4px", fontSize: "22px" }}>
              Redirigiendo...
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "14px" }}>
              Cargando el formulario para restablecer contraseña.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const content = () => {
    if (status === "loading") return (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"16px" }}>⏳</div>
        <h2 style={{ color:"#1B3A6B" }}>Confirmando tu cuenta...</h2>
        <p style={{ color:"#64748B" }}>Un momento por favor.</p>
      </div>
    );
    if (status === "error") return (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"16px" }}>❌</div>
        <h2 style={{ color:"#DC2626" }}>Link inválido</h2>
        <p style={{ color:"#64748B" }}>{error}</p>
      </div>
    );
    return (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"72px", marginBottom:"20px" }}>🎉</div>
        <h2 style={{ color:"#059669", marginBottom:"12px" }}>¡Cuenta confirmada!</h2>
        <p style={{ color:"#334155", marginBottom:"8px" }}>Tu cuenta ha sido verificada exitosamente.</p>
        <p style={{ color:"#64748B", fontWeight:"600" }}>Regresa a la aplicación móvil e inicia sesión.</p>
      </div>
    );
  };

  return (
    <main style={layout}>
      <div style={card}>
        <div style={header}>
          <span style={{ fontSize:"42px" }}>🔐</span>
          <h1 style={{ color:"#fff", margin:"8px 0 4px", fontSize:"22px" }}>ESFOT Auth</h1>
          <p style={{ color:"rgba(255,255,255,0.7)", margin:0, fontSize:"14px" }}>
            Confirmación de cuenta
          </p>
        </div>
        <div style={{ padding:"36px 32px" }}>{content()}</div>
      </div>
    </main>
  );
};

const layout: CSSProperties = {
  minHeight:"100vh", background:"linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)",
  display:"flex", alignItems:"center", justifyContent:"center", padding:"24px",
};
const card: CSSProperties = {
  background:"#fff", borderRadius:"20px",
  boxShadow:"0 20px 60px rgba(27,58,107,0.15)",
  width:"100%", maxWidth:"420px", overflow:"hidden",
};
const header: CSSProperties = {
  background:"linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
  padding:"28px 32px", textAlign:"center",
};