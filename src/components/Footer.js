import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#00b894",
        color: "white",
        textAlign: "center",
        padding: "15px 0",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <p className="mb-0">
        © {new Date().getFullYear()} Level Up Gamer · Despachos a todo Chile
      </p>
    </footer>
  );
}
