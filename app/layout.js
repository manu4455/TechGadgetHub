import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";
import ScrollToTop from "@/components/layouts/ScrollToTop";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
          <ScrollToTop/>
        </GlobalProvider>
      </body>
    </html>
  );
}
