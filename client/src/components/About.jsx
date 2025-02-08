import React from 'react'
import TeamMemberCard from './TeamMemberCard'

const About = () => {
  return (
    <div className='container mx-auto'>
        <div className="container mx-auto p-4 md:p-0">
      <section className="py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">About Us</h1>
        <div className="md:flex md:items-center md:space-x-12">
          <div className="">
            <p className="text-lg leading-relaxed mb-6">
              We are a team of passionate and experienced web developers dedicated to crafting high-quality, innovative digital solutions.  Founded in [Year], we've grown from a small group of freelancers to a thriving agency, driven by a shared commitment to excellence and client satisfaction.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Our expertise spans a wide range of web technologies, including [List key technologies, e.g., React, Node.js, Python, WordPress].  We specialize in [Mention your specializations, e.g., custom web application development, e-commerce solutions, responsive website design].  We believe in a collaborative approach, working closely with our clients to understand their unique needs and deliver solutions that exceed their expectations.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              At [Your Agency Name], we're not just building websites; we're building partnerships. We value transparency, communication, and long-term relationships.  We're committed to staying ahead of the curve in the ever-evolving world of web development, constantly learning and adapting to new technologies and trends.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6">
              To empower businesses with cutting-edge web solutions that drive growth and achieve their strategic objectives.  We strive to create digital experiences that are not only beautiful and functional but also contribute to our clients' success.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-lg leading-relaxed"> {/* Styled list */}
              <li><b>Client-Centric Approach:</b>  We prioritize our clients' needs and goals in every project.</li>
              <li><b>Innovation:</b> We embrace new technologies and creative solutions to deliver the best results.</li>
              <li><b>Quality:</b> We are committed to delivering high-quality, reliable, and maintainable code.</li>
              <li><b>Collaboration:</b> We believe in open communication and teamwork, both internally and with our clients.</li>
              <li><b>Continuous Improvement:</b>  We are always learning and seeking ways to improve our skills and processes.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Optional: Team Section */}
      <section className="py-12 md:py-20 bg-gray-100"> {/* Add a background color */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Meet the Team</h2>
        {/* You can map over your team members' data here to display their profiles */}
        <div>
        <TeamMemberCard/>
          {/* Repeat the above card for other team members */}
        </div>
      </section>
    </div>
    </div>
  )
}

export default About