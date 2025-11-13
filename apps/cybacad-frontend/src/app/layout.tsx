export const metadata = {
  title: "Cybacad",
  description: "Learn cybersecurity, AI, and ethical hacking with Cybacad."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
