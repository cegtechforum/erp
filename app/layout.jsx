import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ERP",
  description: "Enterprise Resource Planning for CEG",
};

export default function RootLayoutServer({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gray-200">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
