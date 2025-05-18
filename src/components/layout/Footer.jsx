import React from "react";

const Footer = ({theme}) => {  // Destructure the theme prop properly
  return (
    <footer className={`py-12 border-t ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4">StoryWeave</h3>
            <ul className="space-y-2 opacity-80">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-2 opacity-80">
              <li>Collaboration</li>
              <li>Publishing</li>
              <li>Templates</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 opacity-80">
              <li>Help Center</li>
              <li>Tutorials</li>
              <li>Documentation</li>
              <li>Webinars</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 opacity-80">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Copyright</li>
            </ul>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t opacity-80 text-sm gap-4 md:gap-0 
        ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <p>© 2025 StoryWeave. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Twitter</span>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;