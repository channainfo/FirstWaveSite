interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  skills: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Vireak Chea",
    role: "Chief Executive Officer (CEO)",
    initials: "VC",
    bio: "An experienced founder with a proven track record in fundraising and a knack for problem-solving. Renowned for his networking prowess and collaborative spirit, he excels at uniting teams around shared goals.",
    skills: ["Fundraising", "Problem Solving", "Team Leadership"]
  },
  {
    name: "Langda Chea",
    role: "Chief Operating Officer (COO)",
    initials: "LC",
    bio: "One of Cambodia's pioneers in building online booking platforms and digital payment solutions. As the Founder and CEO of BookMeBus, he transformed the transportation industry by digitizing operations.",
    skills: ["Visionary Leadership", "Operations", "Market Knowledge"]
  },
  {
    name: "Jay Kong",
    role: "Chief Investment Officer (CIO)",
    initials: "JK",
    bio: "An experienced founder with an impressive track record in fundraising, marketing, public relations, and large-scale project execution. His leadership has been instrumental in driving transformative initiatives.",
    skills: ["SEA Games", "Beyond the Game", "Cultural Impact"]
  },
  {
    name: "Sophorth Khuon",
    role: "Chief Financial Officer (CFO)",
    initials: "SK",
    bio: "CEO and co-founder of Morakot Technology, a leading fintech company. The company manages over $1.5 billion in loan portfolios and operates in Cambodia, Singapore, Thailand, and Myanmar.",
    skills: ["Fintech", "Digital Finance", "Financial Inclusion"]
  },
  {
    name: "Leap Sok",
    role: "Chief Business Officer (CBO)",
    initials: "LS",
    bio: "As an Investment Analyst, Leap contributes to evaluating the deal flow of founders and startups, meeting with stakeholders and potential investors for fundraising.",
    skills: ["Pitch Deck", "Financial Projection", "Team Management"]
  },
  {
    name: "Chhayheng Lov",
    role: "Chief Marketing Officer (CMO)",
    initials: "CL",
    bio: "With over a decade of experience running eCamShopping, Heng specializes in strategic planning and digital marketing, combining data-driven insights with creative execution.",
    skills: ["E-commerce", "Digital Marketing", "Data-Driven"]
  },
  {
    name: "Darareaksmey Saing",
    role: "Chief Legal Officer (CLO)",
    initials: "DS",
    bio: "A lawyer and entrepreneur with expertise in healthcare, education, and asset management. He is dedicated to fostering growth and creating impactful opportunities.",
    skills: ["Corporate Governance", "Problem Solving", "Team Management"]
  },
  {
    name: "Bill Sokhy Chea",
    role: "Chief Program Officer (CPO)",
    initials: "BC",
    bio: "Director and Community Leader of TEDxPhnomPenh, Startup Grind Cambodia, and other dynamic initiatives. Co-founder of OMOHUB and Bluu Deck.",
    skills: ["Event Management", "Community Leadership", "Business Development"]
  },
  {
    name: "Channa Ly",
    role: "Chief Technology Officer (CTO)",
    initials: "CY",
    bio: "Co-founder of BookMeBus and former Tech Lead at OnTheGoSystems. Specializes in building and scaling SaaS platforms, passionate about Web3, AI Agent platforms, and blockchain technologies.",
    skills: ["SaaS Development", "Web3 & AI", "AWS Cloud"]
  }
];

const skillColors = [
  "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
  "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
  "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
  "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300",
];

export function TeamSection() {
  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-slate-900">
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
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 animate-slide-up"
              >
                <div className="p-6">
                  <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">{member.initials}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                  <p className="text-purple-500 dark:text-purple-400 text-center font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs rounded-full ${
                          skillColors[skillIndex % skillColors.length]
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
