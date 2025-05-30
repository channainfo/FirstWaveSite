import { useInView } from "@/hooks/use-in-view";
import React, { useState } from "react";
import TagManager from "react-gtm-module";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  profilePic?: string;
  bio: string;
  readmore: boolean;
  skills: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    facebook?: string;
    github?: string;
    custom?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Vireak Chea",
    role: "Chief Executive Officer (CEO)",
    initials: "VC",
    profilePic: "https://media.licdn.com/dms/image/v2/D5603AQFZe4FQmt7r-Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704175582143?e=1753920000&v=beta&t=Jc3-zofluGnwVeXAJ7nGPsn4b-nS4SaKtdbp_IjizAU",
    bio: "An experienced founder with a proven track record in fundraising and a knack for problem-solving. Renowned for his networking prowess and collaborative spirit, he excels at uniting teams around shared goals.",
    readmore: false,
    skills: ["Fundraising", "Problem Solving", "Team Leadership"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/vireakchea",
      twitter: "https://twitter.com/vireakchea",
      website: "https://pilltech.com.kh",

    },
  },
  {
    name: "Langda Chea",
    // role: "Chief Operating Officer (COO)",
    role: "General Partner",
    initials: "LC",
    profilePic: "https://media.licdn.com/dms/image/v2/D5603AQFvxPhYR2Im2w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730798062107?e=1753920000&v=beta&t=08Mov0fpUYq42EzWeZtWIz40Xc0t6NhRfqeZgo68Gco",
    bio: "One of Cambodia's pioneers in building online booking platforms and digital payment solutions. As the Founder and CEO of BookMeBus, he transformed the transportation industry by digitizing operations.",
    readmore: false,
    skills: ["Visionary Leadership", "Operations", "Market Knowledge"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/langdachea",
      website: "https://bookmebus.com",
    },
  },
  {
    name: "Jay Kong",
    // role: "Chief Investment Officer (CIO)",
    role: "General Partner",
    initials: "JK",
    profilePic: "https://media.licdn.com/dms/image/v2/C5103AQFu6MaCJh7h0w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1562862174622?e=1753920000&v=beta&t=Q4G_5Pxj1o98kj2qGcwflyYG8dIc2PptWZfUthstg8A",
    bio: "An experienced founder with an impressive track record in fundraising, marketing, public relations, and large-scale project execution. His leadership has been instrumental in driving transformative initiatives.",
    readmore: false,
    skills: ["SEA Games", "Beyond the Game", "Cultural Impact"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/jaythekong",
    },
  },
  {
    name: "Sophorth Khuon",
    role: "Chief Financial Officer (CFO)",
    // role: "General Partner",
    initials: "SK",
    profilePic: "https://media.licdn.com/dms/image/v2/C5103AQGy1bM7_pZi9A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1517473490713?e=1753920000&v=beta&t=c9ZOL0JFOzuKRmuhunLOyUlK76j9D7njvVKo1EJwm2U",
    bio: "CEO and co-founder of Morakot Technology, a leading fintech company. The company manages over $1.5 billion in loan portfolios and operates in Cambodia, Singapore, Thailand, and Myanmar.",
    readmore: false,
    skills: ["Fintech", "Digital Finance", "Financial Inclusion"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sophorth",
      website: "https://morakottechnology.com",
    },
  },
  {
    name: "Leap Sok",
    // role: "Chief Business Officer (CBO)",
    role: "General Partner",
    initials: "LS",
    profilePic: "https://media.licdn.com/dms/image/v2/D5603AQFfVUePN_A5oA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1702098282543?e=1753920000&v=beta&t=CqlnG0_XD9sl_lkviIbZsCXnwOg82phUrK2jhmpXO_s",
    bio: "As an Investment Analyst, Leap contributes to evaluating the deal flow of founders and startups, meeting with stakeholders and potential investors for fundraising.",
    readmore: false,
    skills: ["Pitch Deck", "Financial Projection", "Team Management"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/leap-sok",
      website: "https://www.sala.tech",

    },
  },
  {
    name: "Chhayheng Lov",
    // role: "Chief Marketing Officer (CMO)",
    role: "General Partner",
    initials: "CL",
    profilePic: "https://media.licdn.com/dms/image/v2/C5103AQE2tiw8kwNiBw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1540792005922?e=1753920000&v=beta&t=amc0s4d1qlKAh1-9rukqUhb0XolnhnM3tRx1cud-qnc",
    bio: "With over a decade of experience running eCamShopping, Heng specializes in strategic planning and digital marketing, combining data-driven insights with creative execution.",
    readmore: false,
    skills: ["E-commerce", "Digital Marketing", "Data-Driven"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/lov-chhay-heng-1a6640102",
      website: "https://ecamshopping.com",
    },
  },
  {
    name: "Darareaksmey Saing",
    role: "Chief Legal Officer (CLO)",
    // role: "General Partner",
    initials: "DS",
    profilePic: "https://media.licdn.com/dms/image/v2/D5603AQGQYVSk6cODUQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725381334887?e=1753920000&v=beta&t=YgStj45Y2QHKbQ8CgAslsDw0XBGB9XfAK6qZgsNZIDU",
    bio: "A lawyer and entrepreneur with expertise in healthcare, education, and asset management. He is dedicated to fostering growth and creating impactful opportunities.",
    readmore: false,
    skills: ["Corporate Governance", "Problem Solving", "Team Management"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/darareaksmey-saing-a16719b5",
    },
  },
  {
    name: "Bill Sokhy Chea",
    // role: "Chief Program Officer (CPO)",
    role: "General Partner",
    initials: "BC",
    profilePic: "https://media.licdn.com/dms/image/v2/D5603AQGjaQ7CdzVjoA/profile-displayphoto-shrink_400_400/B56ZX05mCqHEAg-/0/1743570494589?e=1753920000&v=beta&t=TzD_B5bTyQxBJzMtXjc52pHAyZkXSe1WW60cahyXnDU",
    bio: "Director and Community Leader of TEDxPhnomPenh, Startup Grind Cambodia, and other dynamic initiatives. Co-founder of OMOHUB and Bluu Deck.",
    readmore: false,
    skills: ["Event Management", "Community Leadership", "Business Development"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/billchea",
      custom: "https://tedxphnompenh.com",
    },
  },

  {
    name: "Channa Ly",
    // role: "Chief Technology Officer (CTO)",
    role: "General Partner",
    initials: "CY",
    profilePic: "https://media.licdn.com/dms/image/v2/D5603AQFth0xhVIMsgQ/profile-displayphoto-shrink_400_400/B56Zce.qLHGoAg-/0/1748571433335?e=1753920000&v=beta&t=f0mkokLbOJNVx7aqd4On6kK46a-qRqYYfKQTG8rz0lw",
    bio: "A seasoned engineer and entrepreneur with a passion for building scalable, real-world platforms. As a co-founder of BookMeBus, he brings deep expertise in backend systems, infrastructure, and product development. He has international experience working remotely with talented teams across the globe. Outside of work, he enjoys exploring AI and blockchain through open-source side projects.",
    readmore: true,
    skills: ["SaaS", "Web3 & AI", "AWS Cloud", "DevOps", "SSO", "API", "BI", "Product Development"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/channaly",
      twitter: "https://twitter.com/channaly",
      custom: "https://channaly.medium.com",
      website: "https://bookmebus.com/",
      github: "https://github.com/channainfo",
    },
  },
];

const skillColors = [
  "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
  "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
  "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
  "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300",
];

export function TeamSection() {
  const [expandedBios, setExpandedBios] = useState<{ [key: number]: boolean }>({});

  const toggleBio = (index: number, name: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "bio_click",
        click_label: `${index}-${name}`,
      },
    });
    setExpandedBios((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="team"
      ref={ref}
      className={`py-20 bg-gray-50 dark:bg-slate-900 ${isInView ? "animate-wave-form" : "opacity-0"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Our Team
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            FirstWave is driven by a strong local team, passionate about enabling Cambodian founders to strive and grow.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => {
              const isExpanded = expandedBios[index] || false;
              const showToggle = member.readmore;

              return (
                <div
                  key={member.name}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:scale-[1.03] hover:-translate-y-2 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 ease-in-out overflow-hidden border border-gray-200 dark:border-gray-700 animate-slide-up"
                >
                  <div className="p-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      {member.profilePic ? (
                        <img
                          src={member.profilePic}
                          alt={`${member.name}'s profile picture`}
                          className="w-full h-full object-cover rounded-full border-4 border-gradient-to-r from-purple-500 to-blue-500"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            // Fallback to initials if image fails to load
                            e.currentTarget.style.display = "none";
                            const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextSibling) {
                              nextSibling.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full gradient-bg rounded-full flex items-center justify-center absolute top-0 left-0 ${member.profilePic ? "hidden" : "flex"
                          }`}
                      >
                        <span className="text-white font-bold text-2xl">{member.initials}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                    <p className="text-purple-500 dark:text-purple-400 text-center font-semibold mb-4">
                      {member.role}
                    </p>
                    <div
                      className="text-sm text-gray-600 dark:text-gray-400 mb-4 pl-4 hover:pl-5 hover:bg-gray-100 dark:hover:bg-slate-700 hover:border-l-4 hover:border-purple-500 dark:hover:border-purple-400 hover:scale-[1.01] transition-all duration-200"
                    >
                      <p
                        className={`${isExpanded || !showToggle ? "" : "line-clamp-4"
                          } transition-all duration-300`}
                      >
                        {member.bio}
                      </p>
                      {showToggle && (
                        <button
                          onClick={() => toggleBio(index, member.name)}
                          className="mt-2 text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 font-semibold text-sm focus:outline-none"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 text-xs rounded-full ${skillColors[skillIndex % skillColors.length]
                            }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {member.socialLinks && (
                      <div className="flex justify-center gap-3">
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s LinkedIn profile`}
                            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                          >
                            <i className="fab fa-linkedin fa-lg"></i>
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s Twitter profile`}
                            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                          >
                            <i className="fab fa-twitter fa-lg"></i>
                          </a>
                        )}
                        {member.socialLinks.website && (
                          <a
                            href={member.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s website`}
                            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                          >
                            <i className="fas fa-globe fa-lg"></i>
                          </a>
                        )}
                        {member.socialLinks.facebook && (
                          <a
                            href={member.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s Facebook profile`}
                            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                          >
                            <i className="fab fa-facebook fa-lg"></i>
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s GitHub profile`}
                            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                          >
                            <i className="fab fa-github fa-lg"></i>
                          </a>
                        )}
                        {member.socialLinks.custom && (
                          <a
                            href={member.socialLinks.custom}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s custom link`}
                            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                          >
                            <i className="fas fa-link fa-lg"></i>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}