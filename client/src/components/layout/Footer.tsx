import { Link } from 'react-router-dom';


export function Footer() {
  return (
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-accent">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-accent">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-accent">Pricing</Link></li>
                <li><Link to="/api" className="hover:text-accent">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/docs" className="hover:text-accent">Documentation</Link></li>
                <li><Link to="/support" className="hover:text-accent">Support</Link></li>
                <li><Link to="/status" className="hover:text-accent">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-accent">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-accent">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p>&copy; 2025 . All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}