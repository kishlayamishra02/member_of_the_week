// Simplified Member Spotlight Application
class MemberSpotlightApp {
  constructor() {
    // Application data
    this.memberData = {
      name: "Kishlaya Mishra",
      phone: "+91 8000363769",
      linkedin: "https://www.linkedin.com/in/kishlayamishra",
      github: "https://github.com/kishlayamishra02",
      summary: "I'm a Computer Science student at BITS Pilani with a deep belief that every real-world challenge has a technical solution. I specialize in Artificial Intelligence, Full-Stack Development, and Cybersecurity. Outside of code, I’m the go-to person for friends’ tech crises, community fundraising, and caring for stray animals — because solving problems doesn’t end at the keyboard.",
      funFacts: [
    "Once tried to teach an AI to make chai; now the kettle expects a salary.",
    "Has more GitHub repos than socks, yet still loses both.",
    "Believes CTRL+Z should exist in real life, especially for weekend cooking experiments.",
    "Thinks 404 errors are just shy webpages needing encouragement.",
    "Wrote ‘Hello World’ in Morse code by knocking during online meetings.",
    "Collects certifications like others collect Pokémon cards – gotta catch ’em all!",
    "Insists laptop fans judge code quality: they roar only at questionable commits.",
    "Can survive 48 hours on nothing but coffee and Stack Overflow.",
    "Claims Java and JavaScript are related like car and carpet – linguistically hilarious.",
    "Believes ‘in production’ is just code’s way of saying ‘YOLO’.",
    "Debugs code by talking to the computer like it’s a therapist.",
    "Thinks semicolons are optional, but bugs are not.",
    "Once tried to automate making tea, ended up with a coffee machine.",
    "Writes comments in code that only future self can understand.",
    "Has a secret stash of energy drinks labeled ‘fuel for bugs’.",
    "Uses rubber duck debugging, but the duck is a plushie named Quack.",
    "Believes every bug is a feature in disguise.",
    "Can type 100 words per minute but still misspell variable names.",
    "Thinks keyboard shortcuts are a form of meditation.",
    "Once coded an entire app during a power outage using only a flashlight."
  ]
    };

    // Application state
    this.state = {
      currentTheme: 'light'
    };

    // DOM elements
    this.elements = {};

    this.init();
  }

  // Initialize the application
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeApp();
      });
    } else {
      this.initializeApp();
    }
  }

  // Initialize all app components
  initializeApp() {
    this.cacheElements();
    this.initializeTheme();
    this.bindEvents();
    this.setupContactButtons();
    this.state.currentFactIndex = 0;
    this.startFactRotation();

  }

  // Cache DOM elements
  cacheElements() {
    this.elements = {
      themeToggle: document.getElementById('themeToggle'),
      memberName: document.getElementById('memberName'),
      memberSummary: document.getElementById('memberSummary'),
      phoneBtn: document.getElementById('phoneBtn'),
      linkedinBtn: document.getElementById('linkedinBtn'),
      githubBtn: document.getElementById('githubBtn'),
      funFact: document.getElementById('funFact')
    };
  }

  // Initialize theme system
  initializeTheme() {
    // Detect system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.state.currentTheme = systemTheme;
    this.applyTheme(systemTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.state.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.state.currentTheme);
      });
  }

  // Apply theme to document
  applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    this.state.currentTheme = theme;
  }

    startFactRotation() {
        if (!this.memberData.funFacts || this.memberData.funFacts.length === 0) {
            this.elements.funFact.textContent = this.memberData.funFact;
            return;
        }

        this.elements.funFact.textContent = this.memberData.funFacts[this.state.currentFactIndex];
        setInterval(() => {
            this.state.currentFactIndex = (this.state.currentFactIndex + 1) % this.memberData.funFacts.length;
            this.elements.funFact.textContent = this.memberData.funFacts[this.state.currentFactIndex];
        }, 7000); // Change fact every 7 seconds
    }


  // Toggle theme manually
  toggleTheme() {
    const newTheme = this.state.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  // Bind event listeners
  bindEvents() {
    // Theme toggle
    this.elements.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Keyboard navigation for theme toggle
    document.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });
  }

  // Handle keyboard navigation
  handleKeyboard(e) {
    switch(e.key) {
      case 't':
      case 'T':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.toggleTheme();
        }
        break;
    }
  }

  // Setup contact buttons with enhanced interactions
  setupContactButtons() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.contact-button, .theme-toggle');
    buttons.forEach(button => {
      this.addRippleEffect(button);
    });

    // Add click tracking for analytics (optional)
    this.elements.phoneBtn.addEventListener('click', () => {
      this.trackInteraction('phone_click');
    });

    this.elements.linkedinBtn.addEventListener('click', () => {
      this.trackInteraction('linkedin_click');
    });

    this.elements.githubBtn.addEventListener('click', () => {
      this.trackInteraction('github_click');
    });
  }

  // Add ripple effect to buttons
  addRippleEffect(element) {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
        z-index: 1;
      `;
      
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // Track user interactions (for analytics - simplified)
  trackInteraction(action) {
    // Simple interaction tracking
    console.log(`User interaction: ${action} at ${new Date().toISOString()}`);
  }

  // Utility method to handle responsive behavior
  handleResize() {
    // Handle any responsive adjustments if needed
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile-specific adjustments can be added here
      console.log('Mobile view detected');
    } else {
      // Desktop adjustments can be added here
      console.log('Desktop view detected');
    }
  }

  // Cleanup method
  destroy() {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeyboard);
    
    // Clean up ripple effects
    const ripples = document.querySelectorAll('.ripple');
    ripples.forEach(ripple => ripple.remove());
  }
}

// Add the ripple effect CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .ripple {
    position: absolute !important;
    border-radius: 50% !important;
    background: rgba(255, 255, 255, 0.3) !important;
    transform: scale(0) !important;
    animation: rippleEffect 0.6s linear !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }
`;
document.head.appendChild(style);

// Initialize the application
let app;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new MemberSpotlightApp();
  });
} else {
  app = new MemberSpotlightApp();
}

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
  if (app) {
    app.handleResize();
  }
});

// Export for potential external use
window.MemberSpotlightApp = MemberSpotlightApp;
