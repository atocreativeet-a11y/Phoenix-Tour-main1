import Footer from "@/components/sections/Footer/Footer";
import Header from "@/components/sections/Header/Header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer/>
    </>
  );
}