import "@/app/_styles/globals.css";

export const metadata = {
  title: "ERP",
  description: "Enterprise Resource Planning for CEG",
};

export default function RootLayoutServer({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200">{children}</body>
    </html>
  );
}
