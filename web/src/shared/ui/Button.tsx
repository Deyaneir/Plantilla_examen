import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit";
  isLoading?: boolean;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      style={{
        padding: 12,
        width: "100%",
        background: "#1B3A6B",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};