import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ERP",
  description: "Enterprise Resource Planning for CEG",
};

export default function RootLayoutServer({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
