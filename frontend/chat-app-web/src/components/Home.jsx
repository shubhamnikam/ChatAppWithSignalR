import React from 'react';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">Chat</div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center flex-1 p-24 mx-auto">
        <div className="flex flex-col items-center text-center md:text-left md:flex-row">
          {/* Left Column */}
          <div className="mb-8 md:mb-0">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Talk to strangers, Make friends!</h1>
            <p className="mb-8 text-xl">
              Welcome to the ultimate social chat experience! Our app revolutionizes the way you connect online.
            </p>
            <a href="/chat">
              <button className="px-6 py-3 text-lg font-semibold transition bg-blue-600 rounded-full hover:bg-blue-700">
                Start Chatting
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
