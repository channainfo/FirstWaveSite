export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-bold">FirstWave</span>
        </div>
        <p className="text-gray-400 mb-4">Empowering Cambodia's Next Generation of Founders</p>
        <p className="text-sm text-gray-500">© 2024 FirstWave. All rights reserved.</p>
      </div>
    </footer>
  );
}
