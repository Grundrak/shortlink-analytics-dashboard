import { Link } from 'react-router-dom';
import { BarChart2, Link as LinkIcon, Globe, Shield, Zap, Users, Check, Star, Link2, ArrowRight, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

export function LandingPage() {
  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-1">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6"
              >
                <Zap className="w-4 h-4 mr-2" />
                Trusted by 50,000+ users worldwide
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Shorten, Share,
                <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Track Everything
                </span>
              </motion.h1>
              
              <motion.p
                className="mt-6 text-lg text-gray-400 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Transform your long URLs into powerful, trackable short links. Get detailed analytics, custom aliases, and enterprise-grade security.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10M+</div>
                  <div className="text-sm text-gray-500">Links Created</div>
                </div>
                <div className="w-px h-10 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div className="w-px h-10 bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5ms</div>
                  <div className="text-sm text-gray-500">Avg. Redirect</div>
                </div>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl transform rotate-3 blur-xl"></div>
                <div className="relative bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
                  {/* Mock Dashboard */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                          <Link2 className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">shrtlnk.io/promo</div>
                          <div className="text-xs text-gray-500">example.com/summer-sale-2024...</div>
                        </div>
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <MousePointerClick className="w-4 h-4 mr-1" />
                        2,847
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Link2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">shrtlnk.io/docs</div>
                          <div className="text-xs text-gray-500">docs.yoursite.com/getting-start...</div>
                        </div>
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <MousePointerClick className="w-4 h-4 mr-1" />
                        1,432
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Link2 className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <div className="text-sm text-white font-medium">shrtlnk.io/signup</div>
                          <div className="text-xs text-gray-500">app.yoursite.com/register?ref=...</div>
                        </div>
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <MousePointerClick className="w-4 h-4 mr-1" />
                        956
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help you manage, track, and optimize your links
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-100 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Three Simple Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Paste Your URL", desc: "Enter any long URL you want to shorten" },
              { step: "02", title: "Customize", desc: "Add a custom alias or use our auto-generated short code" },
              { step: "03", title: "Share & Track", desc: "Share your link and monitor performance in real-time" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-block text-7xl font-bold text-gray-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/4 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free and scale as you grow
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${
                  plan.featured 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl scale-105 border-2 border-amber-500' 
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={`text-lg ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className={`h-5 w-5 mr-3 ${plan.featured ? 'text-amber-400' : 'text-green-500'}`} />
                      <span className={plan.featured ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-8 block w-full text-center py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
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
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Loved by Thousands
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of marketers, developers, and businesses who trust ShortLink for their URL management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}

// Data arrays
const features = [
  {
    icon: <LinkIcon className="w-6 h-6 text-white" />,
    title: "Custom Short Links",
    description: "Create branded short links with custom aliases that are easy to remember and share."
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-white" />,
    title: "Powerful Analytics",
    description: "Track clicks, locations, devices, and referrers with our comprehensive analytics dashboard."
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Enterprise Security",
    description: "Your links are protected with enterprise-grade security and HTTPS encryption."
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "Global CDN",
    description: "Lightning-fast redirects worldwide with our distributed edge network."
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: "Team Collaboration",
    description: "Invite team members and manage permissions with role-based access control."
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: "API Access",
    description: "Integrate link shortening into your apps with our developer-friendly REST API."
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    features: ["Up to 1,000 links/month", "Basic analytics", "Standard support", "7-day data retention"],
    featured: false
  },
  {
    name: "Pro",
    price: "29",
    features: ["Up to 100,000 links/month", "Advanced analytics", "Priority support", "API Access", "Custom domains", "90-day data retention"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "99",
    features: ["Unlimited links", "Real-time analytics", "Dedicated support", "White-labeling", "SSO & SAML", "Unlimited data retention"],
    featured: false
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    content: "ShortLink has transformed how we track our marketing campaigns. The analytics are incredibly detailed."
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    content: "We switched from Bitly and haven't looked back. Better features, better price, better support."
  },
  {
    name: "Emily Rodriguez",
    role: "Developer",
    content: "The API is a dream to work with. We integrated link shortening into our product in under an hour."
  },
];