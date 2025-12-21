'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Chrome, Brain, StickyNote, MessageSquare, Bell, Check, Sparkles, FileText, ListChecks, Clock, Lightbulb, FolderTree, Search, Users, Zap, LogOut, User } from "lucide-react";
// import { ResetPassword } from "./components/ResetPassword";
import { AuthPage } from "./components/AuthPage";
import { Dashboard } from "./components/Dashboard";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

const getInitialRoute = () => {
  if (typeof window === 'undefined') {
    return '/';
  }
  return window.location.hash.slice(1) || '/';
};

const CHROME_URL = "https://chromewebstore.google.com/detail/smart-notes/kjknegjipfnbnlhfbjdnpgfaijpgkbhh";
const FIREFOX_URL = "https://addons.mozilla.org/en-US/firefox/addon/smart-notes/";

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState(() => getInitialRoute());
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if we're on the reset password page (also check query params)
  const searchParams = typeof window !== 'undefined' ? window.location.search : '';
  const isResetPasswordPage = currentRoute === '/reset-password' || 
                                searchParams.includes('token=');

  // Check if we're on auth pages
  const isLoginPage = currentRoute === '/login';
  const isSignupPage = currentRoute === '/signup';
  const isDashboardPage = currentRoute === '/dashboard';

  // Route to appropriate page
  if (isResetPasswordPage) {
    // return <ResetPassword />;
  }
  
  // Redirect to dashboard if already authenticated
  if (isLoginPage || isSignupPage) {
    if (isAuthenticated) {
      window.location.hash = '#/dashboard';
      return null;
    }
    return <AuthPage mode={isLoginPage ? "login" : "signup"} />;
  }
  
  if (isDashboardPage) {
    return <Dashboard />;
  }
  
  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Flag to control pricing section visibility
  const SHOW_PRICING = false;

  const scrollToSection = (sectionId: string) => {
    if (typeof document === 'undefined') return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const features = [
    {
      icon: <StickyNote className="w-8 h-8" />,
      title: "Smart Notes Management",
      description: "Create, edit, update, and delete notes seamlessly within your browser. Keep all your thoughts organized in one place."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Assistant",
      description: "Query your notes using natural language. Just ask \"show my notes from the weekend\" and let AI do the work."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Integrated Discussion Area",
      description: "Add context to your notes with an integrated discussion interface. Edit and update conversations effortlessly."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Custom Notifications",
      description: "Set configurable reminders to never forget important notes, even when the extension is closed."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Cross-Browser Support",
      description: "Available for both Chrome and Firefox. Your notes sync seamlessly across browsers."
    }
  ];

  const benefits = [
    "Instant note-taking without leaving your current tab",
    "AI-powered search and organization",
    "Never lose track of important information",
    "Works offline - no internet required",
    "Privacy-focused - your notes stay local"
  ];

  const nearFutureFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Rich Text Editing with Tiptap",
      description: "Implement Tiptap editor to let users style content (headings, bold, lists, links, etc.). Makes note-taking more expressive and visually organized."
    },
    {
      icon: <ListChecks className="w-6 h-6" />,
      title: "Add Status to Notes",
      description: "Introduce note statuses like Draft, In Progress, Done, Archived. Improve organization and workflow management."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "AI detects dates, deadlines, and time-sensitive text in notes. Automatically reminds users of upcoming tasks or important events."
    }
  ];

  const futureFeatures = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Smart Summarization",
      description: "Use AI to generate concise summaries of long notes. Helps users quickly review and recall key insights."
    },
    {
      icon: <FolderTree className="w-6 h-6" />,
      title: "Smart Categorization",
      description: "Automatically group notes by themes, projects, or topics using AI clustering. Simplifies organization without manual tagging."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Semantic Search",
      description: "Enable natural language search to find notes by meaning, not just keywords. Example: \"show ideas about project launch\" retrieves relevant notes intelligently."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Workspace",
      description: "Introduce collaborative workspaces for teams. Support shared notes, real-time editing, comments, and permissions (Owner/Editor/Viewer)."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for personal use and getting started",
      features: [
        "Unlimited notes",
        "Basic AI search",
        "Cross-browser sync",
        "Offline access",
        "Custom notifications",
        "Discussion area"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Advanced features for power users",
      features: [
        "Everything in Free",
        "Advanced AI features",
        "Smart summarization",
        "Smart categorization",
        "Semantic search",
        "Rich text editing",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Team",
      price: "$29",
      period: "per month",
      description: "Collaboration tools for teams",
      features: [
        "Everything in Pro",
        "Team workspaces",
        "Real-time collaboration",
        "Role-based permissions",
        "Shared notes & comments",
        "Team analytics",
        "Dedicated support"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <StickyNote className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl">Smart Notes</span>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('hero')}>Home</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('features')}>Features</Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('roadmap')}>Roadmap</Button>
            {SHOW_PRICING && (
              <Button variant="ghost" size="sm" onClick={() => scrollToSection('pricing')}>Pricing</Button>
            )}
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p>{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.hash = '#/dashboard'}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.hash = '#/login'}
                  className="hidden-component"
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hidden-component"
                  onClick={() => window.location.hash = '#/signup'}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Note Management
              </Badge>
              <h1 className="text-5xl md:text-6xl tracking-tight">
                Your intelligent browser companion for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  effortless note-taking
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Smart Notes transforms how you capture and organize information online. 
                Create notes instantly, find them with AI, and never forget important details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  asChild
                >
                  <Link href={CHROME_URL} target="_blank" rel="noreferrer">
                    <Chrome className="w-5 h-5" />
                    Add to Chrome
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 hidden-component"
                  asChild
                >
                  <Link href={FIREFOX_URL} target="_blank" rel="noreferrer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.786 17.57c-1.108.95-3.118 1.43-4.924 1.43-2.146 0-3.896-.614-5.25-1.843v-1.714h.857c.393 0 .715-.321.715-.714v-1.286c0-.393-.322-.714-.715-.714h-.857V11.43h.857c.393 0 .715-.321.715-.714V9.43c0-.393-.322-.714-.715-.714h-.857V7.43c1.354-1.229 3.104-1.843 5.25-1.843 1.806 0 3.816.48 4.924 1.43.393.336.857.95.857 1.713v7.143c0 .763-.464 1.377-.857 1.697z"/>
                    </svg>
                    Add to Firefox
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Free to use
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Privacy-focused
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  Offline support
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1689001164659-aa239f92853e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2UlMjBub3Rlc3xlbnwxfHx8fDE3NjI5NDAyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Smart Notes in action"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-4xl mb-4">Everything you need to stay organized</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Smart Notes combines powerful features with an intuitive interface to help you capture, 
              organize, and recall information effortlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Brain className="w-10 h-10" />
                    <div>
                      <div className="text-sm opacity-90">Try AI Search</div>
                      <div className="text-lg">"Show my notes from the weekend"</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2">
                    <div className="bg-white/20 rounded p-3">
                      <div className="text-sm opacity-75">Saturday, 2:30 PM</div>
                      <div>Meeting notes: Project kickoff ideas</div>
                    </div>
                    <div className="bg-white/20 rounded p-3">
                      <div className="text-sm opacity-75">Sunday, 10:15 AM</div>
                      <div>Shopping list: groceries and supplies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Badge variant="secondary" className="mb-4">Why Smart Notes?</Badge>
              <h2 className="text-4xl mb-6">Work smarter, not harder</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">What's Coming</Badge>
            <h2 className="text-4xl mb-4">Smart Notes Feature Roadmap</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're constantly evolving Smart Notes with new features to make your note-taking experience even more powerful and intelligent.
            </p>
          </div>

          {/* Near Future */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl">Nearly Future</h3>
                <p className="text-gray-600">Next Development Cycle</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {nearFutureFeatures.map((feature, index) => (
                <Card key={index} className="p-6 border-2 border-green-200 bg-green-50/30 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Future */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl">Future</h3>
                <p className="text-gray-600">AI-Powered & Collaborative Evolution</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {futureFeatures.map((feature, index) => (
                <Card key={index} className="p-6 border-2 border-blue-200 bg-blue-50/30 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-2">
              <p className="text-gray-700 mb-4">
                Have ideas for features you'd like to see? We'd love to hear from you!
              </p>
              <Button variant="outline" size="lg">Share Your Feedback</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {SHOW_PRICING && (
        <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Pricing</Badge>
              <h2 className="text-4xl mb-4">Choose the perfect plan for you</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start for free and upgrade as you grow. All plans include our core features.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`p-8 relative ${
                    plan.popular 
                      ? 'border-2 border-blue-500 shadow-xl scale-105' 
                      : 'border-2 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/ {plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => window.location.hash = '#/signup'}
                  >
                    {plan.name === 'Free' ? 'Get Started' : `Get ${plan.name}`}
                  </Button>
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Need a custom plan for your organization?
              </p>
              <Button variant="outline" size="lg">Contact Sales</Button>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-6">
            Ready to transform your note-taking?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who never forget important information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="gap-2"
              asChild
            >
              <Link href={CHROME_URL} target="_blank" rel="noreferrer">
                <Chrome className="w-5 h-5" />
                Add to Chrome - It's Free
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 bg-transparent text-white border-white hover:bg-white/10 hidden-component"
              asChild
            >
              <Link href={FIREFOX_URL} target="_blank" rel="noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.786 17.57c-1.108.95-3.118 1.43-4.924 1.43-2.146 0-3.896-.614-5.25-1.843v-1.714h.857c.393 0 .715-.321.715-.714v-1.286c0-.393-.322-.714-.715-.714h-.857V11.43h.857c.393 0 .715-.321.715-.714V9.43c0-.393-.322-.714-.715-.714h-.857V7.43c1.354-1.229 3.104-1.843 5.25-1.843 1.806 0 3.816.48 4.924 1.43.393.336.857.95.857 1.713v7.143c0 .763-.464 1.377-.857 1.697z"/>
                </svg>
                Add to Firefox - It's Free
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">
            No credit card required • Free forever • Install in seconds
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <StickyNote className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xl">Smart Notes</span>
              </div>
              <p className="text-sm max-w-md">
                Your intelligent browser companion for effortless note-taking. 
                Capture ideas, organize thoughts, and find information instantly with AI.
              </p>
            </div>
            <div>
              <div className="text-white mb-3">Product</div>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </div>
                <div>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </div>
                <div>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white mb-3">Company</div>
              <div className="space-y-2 text-sm">
                <div>About</div>
                <div>Blog</div>
                <div>Contact</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            © 2025 Smart Notes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
