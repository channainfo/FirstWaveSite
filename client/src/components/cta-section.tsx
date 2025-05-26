export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800">
      <div className="container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Take Your Startup to the Next Level?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join the FirstWave community and accelerate your journey from post-acceleration to global success. Our expert mentors are ready to guide you through fundraising, scaling, and building world-class teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <a
              href="mailto:team@firstwave.asia?subject=Startup Application - FirstWave"
              className="inline-flex items-center justify-center bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-xl"
            >
              <i className="fas fa-paper-plane mr-3"></i>
              Apply Now
            </a>
            <a
              href="mailto:team@firstwave.asia?subject=Mentorship Inquiry - FirstWave"
              className="inline-flex items-center justify-center bg-transparent border-3 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-200 text-xl"
            >
              <i className="fas fa-users mr-3"></i>
              Get Mentorship
            </a>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
            <h3 className="text-2xl font-bold mb-4">Why Choose FirstWave?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Expert Guidance</h4>
                  <p className="text-sm opacity-90">Learn from founders who've been there</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Local Focus</h4>
                  <p className="text-sm opacity-90">Cambodia-specific market insights</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-gray-900 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Proven Results</h4>
                  <p className="text-sm opacity-90">$1M+ raised by our startups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}