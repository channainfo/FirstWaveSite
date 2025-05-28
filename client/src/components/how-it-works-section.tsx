import howitworksImage from '../assets/how-it-works-firstwave.avif';
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Our Approach
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            FirstWave works through a structured approach to empower startups
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Startup Selection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We identify promising post-acceleration startups with high potential
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Mentorship Program</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer tailored workshops, 1:1 mentoring, and peer learning sessions
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-24 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Strategic Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We provide guidance on product-market fit, investor readiness, and team growth
              </p>
            </div>

            <div className="text-center animate-slide-up">
              <div className="relative mb-6">
                <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Ecosystem Building</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We collaborate with accelerators, investors, and industry partners to strengthen the overall startup ecosystem
              </p>
            </div>
          </div>

          {/* Process Illustration */}
          <div className="mt-16 animate-slide-up">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={howitworksImage}
                  alt="Modern office in Cambodia"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Structured Growth Process</h3>
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Our comprehensive approach ensures that startups receive the right support at the right time, maximizing their potential for success in both local and global markets.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-green-500 text-xl"></i>
                    <span>Tailored mentorship programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-green-500 text-xl"></i>
                    <span>Regular progress tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-green-500 text-xl"></i>
                    <span>Network building opportunities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-green-500 text-xl"></i>
                    <span>Investor readiness preparation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
