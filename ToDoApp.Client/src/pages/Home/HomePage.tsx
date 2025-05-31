import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">Welcome to ToDoApp</h1>
        <p className="text-lg text-gray-600 mb-8">
          Easily manage your tasks, create groups, assign responsibilities, and track progress - all in one place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-xl text-lg hover:bg-indigo-50 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
