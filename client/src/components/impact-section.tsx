import { useEffect, useState } from "react";

interface MetricProps {
  value: string;
  label: string;
  icon: string;
  color: string;
  delay?: number;
}

function AnimatedMetric({ value, label, icon, color, delay = 0 }: MetricProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="text-center animate-slide-up">
      <div
        className={`w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${
          isVisible ? "animate-float" : ""
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <i className={`${icon} text-white text-3xl`}></i>
      </div>
      <div className={`text-3xl md:text-4xl font-bold ${color} mb-2`}>{value}</div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">{label}</p>
    </div>
  );
}

export function ImpactSection() {
  const metrics = [
    {
      value: "10",
      label: "Startups Supported",
      icon: "fas fa-rocket",
      color: "text-purple-600 dark:text-purple-400",
      delay: 0,
    },
    {
      value: "20",
      label: "Founders Coached",
      icon: "fas fa-user-tie",
      color: "text-blue-600 dark:text-blue-400",
      delay: 200,
    },
    {
      value: "$1M",
      label: "Follow-on Funding",
      icon: "fas fa-dollar-sign",
      color: "text-green-600 dark:text-green-400",
      delay: 400,
    },
    {
      value: "100",
      label: "Jobs Created",
      icon: "fas fa-users",
      color: "text-orange-600 dark:text-orange-400",
      delay: 600,
    },
    {
      value: "50",
      label: "Publications & Stories",
      icon: "fas fa-newspaper",
      color: "text-purple-600 dark:text-purple-400",
      delay: 800,
    },
  ];

  return (
    <section id="impact" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Measuring Our Success
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            At FirstWave, we believe in tracking tangible outcomes to demonstrate the value and effectiveness of our initiative. Our success is measured through key metrics that reflect the growth and impact of the startups we support.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {metrics.map((metric) => (
              <AnimatedMetric key={metric.label} {...metric} />
            ))}
          </div>

          {/* Impact Visualization */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Technology innovation"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="animate-slide-up">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Growing Cambodia's Startup Ecosystem
              </h3>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                Our impact extends beyond numbers. We're building a sustainable ecosystem where Cambodian entrepreneurs can thrive, create meaningful solutions, and compete globally.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Accelerated startup growth trajectories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Enhanced founder capabilities and confidence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Strengthened investor networks and funding access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span>Expanded regional and global market reach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
