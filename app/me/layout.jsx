import Sidebar2 from "@/components/layouts/Sidebar2";

export default function UserLayout({ children }) {
  return (
    <>
      <section className="py-5 sm:py-7 ">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="text-bold text-3xl">My Account</h1>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar2 />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article className="  mb-5 p-3 lg:p-5">
                {children}
              </article>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}
