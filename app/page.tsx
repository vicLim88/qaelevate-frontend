'use client';

/**
 * Landing/Home Page
 */
import { 
  Brain, Atom, Zap, ArrowRight, Mail, Github, Twitter, 
  Linkedin, Target, Shield, Rocket, Globe, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">QAElevate</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#mission" className="text-gray-300 hover:text-white transition-colors">Mission</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <Link href="/login">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-purple-300/20 animate-bounce">
          <Brain size={60} />
        </div>
        <div className="absolute top-40 right-20 text-blue-300/20 animate-pulse">
          <Atom size={40} />
        </div>
        <div className="absolute bottom-32 right-32 text-purple-300/20 animate-bounce">
          <Zap size={50} />
        </div>
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-6 shadow-2xl">
            <div className="relative">
              <Brain className="w-16 h-16 text-white animate-pulse" />
              <Atom className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
            </div>
          </div>
          
                    <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            QAElevate
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Quantum-Enhanced Autonomous AI Testing
          </p>
          
          <p className="text-lg text-gray-400 mb-12">
            Next-Generation Intelligent Test Automation 🤖⚡
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
              <div className="text-3xl font-bold text-green-400 mb-1">10x</div>
              <div className="text-sm text-gray-300">Faster Discovery</div>
              <div className="text-xs text-gray-400">AI-Powered Automation</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400 mb-1">3x</div>
              <div className="text-sm text-gray-300">Better Coverage</div>
              <div className="text-xs text-gray-400">Quantum Optimization</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400 mb-1">Zero</div>
              <div className="text-sm text-gray-300">Manual Setup</div>
              <div className="text-xs text-gray-400">Fully Autonomous</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/50">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link href="/dashboard">
              <button className="flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-xl text-white font-medium hover:bg-white/20 transition-all border border-white/20">
                <span>View Dashboard</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What is QAElevate?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A revolutionary testing platform that combines AI autonomy with quantum computing
              to deliver unprecedented testing efficiency and cost savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <Brain className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI Discovery</h3>
              <p className="text-gray-400 text-sm">
                Autonomous agents explore your application, discovering all possible user flows and edge cases automatically
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <Atom className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Quantum Optimization</h3>
              <p className="text-gray-400 text-sm">
                QAOA algorithms optimize test case selection, ensuring maximum coverage with minimal redundancy
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Execution</h3>
              <p className="text-gray-400 text-sm">
                Distributed parallel test execution delivers results in minutes, not hours or days
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Connect</h4>
                <p className="text-sm text-gray-400">Provide your app URL or upload mobile app files</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Discover</h4>
                <p className="text-sm text-gray-400">AI agents map your application structure and flows</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Optimize</h4>
                <p className="text-sm text-gray-400">Quantum algorithms select optimal test coverage</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Execute</h4>
                <p className="text-sm text-gray-400">Tests run in parallel with instant results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="relative py-20 px-4 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-10 h-10 text-blue-400" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                To democratize high-quality software testing by making enterprise-grade test automation 
                accessible, affordable, and efficient for development teams of all sizes.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Eliminate cost barriers with 95% reduction vs traditional cloud solutions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Reduce time-to-market with autonomous AI-powered test generation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Ensure comprehensive coverage through quantum-optimized test selection</p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <Rocket className="w-10 h-10 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                To pioneer the post-cloud era of software testing, where quantum computing and AI convergence 
                redefines what&apos;s possible in quality assurance and developer productivity.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Build a global distributed testing network with predictable, transparent pricing</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Atom className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Advance quantum computing applications in software engineering</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">Create truly autonomous AI agents that evolve with your applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-400">
              Have questions? Want to collaborate? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a
              href="mailto:contact@qaelevate.com"
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <Mail className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm">contact@qaelevate.com</p>
            </a>

            <a
              href="https://github.com/qaelevate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <Github className="w-10 h-10 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm">Check out our open source projects</p>
            </a>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Testing?</h3>
            <p className="text-gray-300 mb-6">
              Join the post-cloud revolution and experience the future of quality assurance today.
            </p>
            <Link href="/login">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg">
                Start Your Free Trial
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">QAElevate</span>
              </div>
              <p className="text-gray-400 text-sm">
                Next-Generation AI + Quantum Testing Platform
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Dashboard</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#mission" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#mission" className="text-gray-400 hover:text-white transition-colors text-sm">Mission & Vision</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="https://twitter.com/qaelevate" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                  <Twitter className="w-5 h-5 text-gray-400" />
                </a>
                <a href="https://github.com/qaelevate" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                  <Github className="w-5 h-5 text-gray-400" />
                </a>
                <a href="https://linkedin.com/company/qaelevate" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                  <Linkedin className="w-5 h-5 text-gray-400" />
                </a>
              </div>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} QAElevate. All rights reserved. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
