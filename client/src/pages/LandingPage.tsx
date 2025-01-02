import { Link } from 'react-router-dom';
import { BarChart2, Link as LinkIcon, Globe, Shield, Zap, Users, Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Color palette
const colors = {
  primary: '#4F46E5',    // Indigo
  secondary: '#10B981',  // Emerald Green
  accent: '#F59E0B',     // Amber
  dark: '#1F2937',       // Slate Gray
  light: '#F3F4F6',      // Light Gray
};

export function LandingPage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="block">Transform Your Links</span>
                <span className="block text-accent">Into Powerful Tools</span>
              </motion.h1>
              
              <motion.p
                className="mt-6 text-lg sm:text-xl text-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Create, manage, and track your shortened URLs with powerful analytics and customization options.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-accent text-primary font-bold rounded-full 
                    shadow-lg hover:bg-amber-600 hover:text-white transform hover:scale-105 
                    transition duration-300"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 bg-transparent border-2 border-accent text-white 
                    font-bold rounded-full hover:bg-accent hover:text-primary 
                    transform hover:scale-105 transition duration-300"
                >
                  See How It Works
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 
                  rounded-2xl transform rotate-6"></div>
                <img
                  src="https://res.cloudinary.com/dam7phgic/image/upload/v1707233516/cld-sample.jpg"
                  alt="URL Shortening Illustration"
                  className="relative rounded-2xl shadow-2xl w-full"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" viewBox="0 0 1440 320" fill="none">
            <path fill={colors.light} d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,117.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm text-accent font-bold tracking-wider uppercase">Features</h2>
            <p className="mt-2 text-4xl font-bold text-primary">Everything You Need in One Place</p>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help you manage, track, and optimize your links
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300
                  transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm text-accent font-bold tracking-wider uppercase">Pricing</h2>
            <p className="mt-2 text-4xl font-bold text-primary">Simple, Transparent Pricing</p>
            <p className="mt-4 text-lg text-gray-600">
              Choose the perfect plan for your needs
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.featured 
                    ? 'bg-primary text-white' 
                    : 'bg-white'
                } shadow-xl`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4 text-4xl font-bold">
                  ${plan.price}
                  <span className="text-lg font-normal">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-accent mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-8 block w-full text-center py-3 px-4 rounded-full font-bold
                    ${
                      plan.featured
                        ? 'bg-amber-600 text-primary hover:bg-amber-700'
                        : 'bg-primary text-white hover:bg-dark'
                    }
                    transition-all duration-300 transform hover:scale-105`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm text-accent font-bold tracking-wider uppercase">Testimonials</h2>
            <p className="mt-2 text-4xl font-bold text-primary">What Our Users Say</p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-light p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                    loading="lazy"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
                <div className="mt-4 flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link
                to="/signup"
                className="inline-block px-8 py-4 bg-accent text-primary font-bold 
                  rounded-full shadow-lg hover:bg-amber-600 hover:text-white 
                  transform hover:scale-105 transition duration-300"
              >
                Create Your Free Account
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}

// Data arrays
const features = [
  {
    icon: <LinkIcon className="w-6 h-6 text-light" />,
    title: "Custom Short Links",
    description: "Create branded short links with custom domains and aliases."
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-light" />,
    title: "Powerful Analytics",
    description: "Track link performance with detailed analytics and insights."
  },
  {
    icon: <Shield className="w-6 h-6 text-light" />,
    title: "Advanced Security",
    description: "Protect your links with robust security measures and encryption."
  },
  {
    icon: <Globe className="w-6 h-6 text-light" />,
    title: "Global Reach",
    description: "Ensure fast and reliable link redirection across the globe."
  },
  {
    icon: <Users className="w-6 h-6 text-light" />,
    title: "Team Collaboration",
    description: "Collaborate with your team seamlessly with multi-user support."
  },
  {
    icon: <Zap className="w-6 h-6 text-light" />,
    title: "API Access",
    description: "Integrate our URL shortening service with your applications via API."
  },
];

const stats = [
  { value: "10M+", label: "Links Shortened" },
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" }
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    features: ["Up to 1,000 links/month", "Basic analytics", "Standard support"],
    featured: false
  },
  {
    name: "Pro",
    price: "29",
    features: ["Up to 100,000 links/month", "Advanced analytics", "Priority support", "API Access"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "99",
    features: ["Unlimited links", "Customized analytics", "Dedicated support", "White-labeling", "API Access"],
    featured: false
  },
];

const testimonials = [
  {
    name: "John Doe",
    role: "Marketing Manager",
    avatar: "/avatar1.jpg",
    content: "This tool has transformed how we manage our marketing campaigns. Highly recommend!"
  },
  {
    name: "Jane Smith",
    role: "Product Designer",
    avatar: "/avatar2.jpg",
    content: "A seamless experience with powerful features. Our team productivity has skyrocketed."
  },
  {
    name: "Mike Johnson",
    role: "Developer",
    avatar: "/avatar3.jpg",
    content: "Integrating with our existing systems was a breeze. Excellent support and documentation."
  },
];