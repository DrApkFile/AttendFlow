export default function Dashboard() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
        <h1 className="text-5xl font-extrabold mb-6 text-white relative animate-text-glow">
          Welcome to the <span className="text-yellow-400">Dashboard</span>
        </h1>
        <p className="text-lg text-gray-200 animate-slide-in">
          Select an option from the sidebar to get started.
        </p>
      </div>
    );
  }
  