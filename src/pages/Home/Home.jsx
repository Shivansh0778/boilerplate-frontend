import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, LockKeyhole } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero */}
      <main>
        <section className="px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              MERN Authentication Boilerplate
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              A solid foundation for your
              <span className="block text-gray-500">next web application.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              A reusable authentication and user management foundation built
              with MongoDB, Express, React, and Node.js. Start with the
              essentials and build your application on top of it.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
              >
                Get started
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/signup"
                className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
              >
                Create account
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-gray-200 bg-white px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  <ShieldCheck size={20} className="text-gray-700" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Secure authentication
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  JWT-based authentication with protected routes and secure
                  password handling.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  <Users size={20} className="text-gray-700" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  User management
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Manage users, roles, account status, and administrative
                  actions from one place.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  <LockKeyhole size={20} className="text-gray-700" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Role-based access
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Separate admin and user permissions to keep application
                  access organized.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

