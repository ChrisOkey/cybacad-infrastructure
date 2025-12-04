import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
      <p>
        © {new Date().getFullYear()} CybAcad. All rights reserved.
      </p>
    </footer>
  );
}
