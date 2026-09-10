import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 px-6">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            MERN Authentication Boilerplate
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-gray-800 md:text-5xl">
            VIS Boilerplate
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
            A reusable authentication and user management foundation built with
            MongoDB, Express, React, and Node.js.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/login"
              className="rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
