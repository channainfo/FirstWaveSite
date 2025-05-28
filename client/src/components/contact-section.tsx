export function ContactSection() {
  const socialLinks = [
    {
      icon: "fab fa-facebook",
      href: "#",
      label: "Facebook",
    },
    {
      icon: "fab fa-linkedin",
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: "fab fa-twitter",
      href: "#",
      label: "Twitter",
    },
    {
      icon: "fab fa-telegram",
      href: "#",
      label: "Telegram",
    },
  ];

  return (
    <section id="contact" className="py-20 gradient-bg dark:dark-gradient-bg">
      <div className="container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Shaping the Cambodian Ecosystem
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            FirstWave is committed to fostering innovation and sustainable growth within Cambodia's entrepreneurial landscape. If you are a promising post-acceleration startup or an investor looking to contribute to Cambodia's vibrant future, connect with us to learn more.
          </p>

          <div className="mb-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:team@firstwave.asia"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg"
              >
                <i className="fas fa-envelope mr-3"></i>
                Contact Us Now
              </a>
              { /* mailto:team@firstwave.asia?subject=Partnership Inquiry - FirstWave */}
              <a
                href="mailto:team@firstwave.asia?subject=Partnership%20Inquiry%20-%20FirstWave"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-200 text-lg"
              >
                <i className="fas fa-handshake mr-3"></i>
                Partner With Us
              </a>
            </div>
            <p className="text-lg opacity-90">
              Email us: <span className="font-bold">team at firstwave.asia</span>
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 transform hover:scale-110"
                aria-label={link.label}
              >
                <i className={`${link.icon} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
