import "@/app/_styles/globals.css";
export const metadata = {
  title: "ERP",
  description: "Enterprise Resource Planning for CEG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
