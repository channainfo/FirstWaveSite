export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Our Mission and Vision
          </h2>
        </div>

        {/* The Challenge */}
        <div className="mb-16 animate-slide-up">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">The Challenge</h3>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
              Many startups graduate from incubators and accelerators without a clear roadmap for their next phase. These gaps hinder the potential for Cambodian startups to thrive in local and expand to global markets.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-chart-line text-red-600 dark:text-red-400 text-xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Scaling Businesses</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Challenges in expanding operations and reaching new markets
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-dollar-sign text-green-600 dark:text-green-400 text-xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Follow-on Funding</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Securing investment for growth and expansion phases
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-users text-blue-600 dark:text-blue-400 text-xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Team Leadership</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Building and leading effective teams for success
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-cog text-purple-600 dark:text-purple-400 text-xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Product Iteration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Iterating products to meet evolving market demands
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FirstWave Solution */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  FirstWave: A Founders-First Initiative
                </h3>
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  FirstWave is a community of experienced entrepreneurs dedicated to mentoring post-acceleration startups. We are a platform designed to address the specific needs of startups in Cambodia's unique ecosystem.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Fundraising strategies</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Team leadership and culture building</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Scaling and expanding beyond Cambodia</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <span>Product development and iteration</span>
                  </div>
                </div>
              </div>
              <div className="animate-slide-up">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Team collaboration"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why FirstWave */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-bold mb-12">Why FirstWave?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-graduate text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Expert Mentorship</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access to seasoned founders who have navigated the journey themselves
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Local Focus</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tailored support that addresses Cambodia's unique challenges and opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-network-wired text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Network Access</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connections to investors, partners, and regional opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold mb-2">Practical Strategies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-world advice on scaling, fundraising, and leadership
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Vision */}
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Vision</h3>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            Our vision is to create a thriving Cambodian startup ecosystem that empowers entrepreneurs to solve meaningful local problems and compete on the global stage.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <i className="fas fa-clock text-3xl text-purple-500 mb-4"></i>
              <h4 className="font-semibold mb-2">Shorten Learning Curve</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Spend less time making mistakes and more time executing
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <i className="fas fa-tools text-3xl text-blue-500 mb-4"></i>
              <h4 className="font-semibold mb-2">Equip with Tools</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Provide founders with tools to execute and solve real local problems
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <i className="fas fa-globe text-3xl text-green-500 mb-4"></i>
              <h4 className="font-semibold mb-2">Global Expansion</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Position startups to excel locally and expand globally
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
