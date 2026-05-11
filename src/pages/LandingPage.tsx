import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  Users, 
  BadgePercent, 
  Info, 
  Lock,
  CheckCircle2, 
  Download,
  X,
  CreditCard,
  Zap
} from 'lucide-react';
import logo from '../assets/logo.png';
import { cn } from '../utils/cn';
import GlobalFooter from '../components/GlobalFooter';
import { useSubscription } from '../utils/SubscriptionContext';

// --- Types ---
interface Article {
  id: string;
  tag: string;
  vol: string;
  title: string;
  author: string;
  date: string;
  abstract: string;
  fullContent?: string;
  pdfAvailable?: boolean;
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSubscribed } = useSubscription();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [viewState, setViewState] = useState<'landing' | 'locked' | 'full'>('landing');

  // Mock Articles Data
  const articles: Article[] = [
    {
      id: 'ART-001',
      tag: 'Topology',
      vol: '42',
      title: 'On the Homotopy Type of Certain Spaces',
      author: 'Dr. S. Raman',
      date: 'OCT 2023',
      abstract: 'An exploration of the properties of spaces derived from complex algebraic varieties and their fundamental groups. This research identifies new topological invariants using persistent homology techniques.',
      fullContent: 'The fundamental group of a complex algebraic variety is a powerful invariant. In this section, we derive the homotopy type of certain singular varieties by constructing a spectral sequence that converges to the persistent homology. Our findings suggest that for a specific class of Calabi-Yau manifolds, the topological invariants remain invariant under birational transformations, providing a new link between algebraic geometry and theoretical physics. [This section represents 2,400 words of rigorous mathematical proofs and topological classifications].',
      pdfAvailable: true
    },
    {
      id: 'ART-002',
      tag: 'Number Theory',
      vol: '42',
      title: 'Prime Distribution in Arithmetic Progressions',
      author: 'M. Nair',
      date: 'SEP 2023',
      abstract: 'A deep dive into the distribution patterns of prime numbers within specific arithmetic progression sequences, refining the Dirichlet Theorem estimates.',
      fullContent: 'Consider the sequence {a + nd}. We analyze the error term in the prime number theorem for arithmetic progressions. By utilizing the zero-free region of the Riemann zeta function, we prove that the distribution of primes follows a sub-exponential density function for all moduli q < (log x)^A. This refinement allows for more precise cryptography estimates in lattice-based security protocols. [Detailed proof spanning 15 pages of complex number analysis and sieve method applications].',
      pdfAvailable: true
    },
    {
      id: 'ART-003',
      tag: 'Applied Math',
      vol: '41',
      title: 'Fluid Dynamics in Porous Media',
      author: 'A. K. Menon',
      date: 'JUN 2023',
      abstract: 'Investigating the flow of viscous fluids through porous materials using non-linear differential equations to model industrial filtration processes.',
      fullContent: 'The Darcy-Forchheimer equation provides a model for non-Newtonian fluid flow in stochastic porous structures. Our research employs a multi-scale finite element method to solve the coupled pressure-velocity fields. Results indicate that local turbulence within pore throats significantly influences the macroscopic permeability tensor, suggesting improvements in carbon capture and storage (CCS) reservoir modeling. [Experimental data and simulation results included].',
      pdfAvailable: true
    }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status (Keep auth in localStorage as per existing setup)
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReadArticle = (article: Article) => {
    setActiveArticle(article);
    if (isLoggedIn && isSubscribed) {
      setViewState('full');
    } else {
      setViewState('locked');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlock = () => {
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      navigate('/reader-dashboard/get-subscription');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    // Note: Subscription state is naturally lost on refresh, 
    // but context provides it during the session.
    setIsLoggedIn(false);
    setViewState('landing');
  };

  // --- Render Components ---

  const LockedScreen = ({ article }: { article: Article }) => (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setViewState('landing')}
          className="flex items-center gap-2 text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest mb-10 transition-colors"
        >
          <X size={14} /> Back to Archive
        </button>

        <header className="mb-12">
          <div className="flex gap-3 mb-6">
            <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{article.tag}</span>
            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest pt-1">VOL. {article.vol}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tighter leading-tight">{article.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-black">{article.author}</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{article.date}</span>
          </div>
        </header>

        <div className="relative">
          {/* Abstract - Visible */}
          <div className="bg-zinc-50 p-8 md:p-12 rounded-[2.5rem] border border-zinc-100 mb-8">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Abstract Preview</h3>
            <p className="text-xl text-zinc-800 leading-relaxed italic">
              "{article.abstract}"
            </p>
          </div>

          {/* Locked Content Overlay */}
          <div className="relative h-[400px] overflow-hidden rounded-[2.5rem]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10" />
            <div className="space-y-6 blur-[8px] opacity-30 select-none">
              <p className="text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="text-lg leading-relaxed">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p className="text-lg leading-relaxed">Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white/80 backdrop-blur-xl border border-zinc-200 p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-xl">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-black/20">
                  <Lock size={32} />
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">Subscribe to Read More</h2>
                <p className="text-zinc-500 mb-10 leading-relaxed">
                  The full text of this peer-reviewed research is available exclusively to KMA members with an active subscription.
                </p>
                
                <button 
                  onClick={handleUnlock}
                  className="w-full py-5 bg-black text-white rounded-2xl font-bold text-sm tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-black/20"
                >
                  <Zap size={18} className="fill-yellow-400 text-yellow-400" />
                  {isLoggedIn ? "UPGRADE TO UNLOCK" : "LOGIN TO UNLOCK"}
                </button>
                
                {!isLoggedIn && (
                  <p className="mt-6 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                    Don't have an account? <button onClick={() => navigate('/auth')} className="text-black underline">Join KMA today</button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FullArticleView = ({ article }: { article: Article }) => (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => setViewState('landing')}
            className="flex items-center gap-2 text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors"
          >
            <X size={14} /> Close Reader
          </button>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
              <CheckCircle2 size={12} /> Full Access
            </span>
            {article.pdfAvailable && (
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-black hover:text-white rounded-lg text-[10px] font-black tracking-widest transition-all uppercase">
                <Download size={14} /> PDF
              </button>
            )}
          </div>
        </div>

        <header className="mb-16">
          <div className="flex gap-3 mb-6">
            <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{article.tag}</span>
            <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest pt-1">VOL. {article.vol}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-black mb-8 tracking-tighter leading-[1.1]">{article.title}</h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-black">{article.author}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{article.date} • PEER REVIEWED</p>
            </div>
          </div>
        </header>

        <div className="prose prose-zinc max-w-none">
          <div className="bg-zinc-50 p-8 sm:p-12 rounded-[2.5rem] mb-16 border border-zinc-100">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Abstract</h3>
            <p className="text-xl text-zinc-800 leading-relaxed font-serif italic">
              {article.abstract}
            </p>
          </div>

          <div className="space-y-8 text-lg leading-relaxed text-zinc-700 font-serif">
            <h3 className="text-2xl font-bold text-black font-sans uppercase tracking-widest">1. Research Findings</h3>
            <p>{article.fullContent}</p>
            <p>Mathematical rigor remains the cornerstone of our association. In the subsequent sections, we explore the implications of these findings for computational number theory and topology.</p>
            
            <div className="py-12 flex justify-center">
              <div className="w-24 h-1 bg-zinc-100 rounded-full" />
            </div>

            <h3 className="text-2xl font-bold text-black font-sans uppercase tracking-widest">2. Methodology</h3>
            <p>The methodology employed in this study follows the standardized KMA protocol for topological analysis. Data was collected over a 12-month period across multiple mathematical models using advanced computational sieves.</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (viewState === 'locked' && activeArticle) return <LockedScreen article={activeArticle} />;
  if (viewState === 'full' && activeArticle) return <FullArticleView article={activeArticle} />;

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white animate-in fade-in duration-700">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 py-4 lg:py-6 ${
        isScrolled 
          ? "bg-white/70 backdrop-blur-lg border-b border-zinc-200 py-3 shadow-sm" 
          : "bg-white border-b border-zinc-100 py-4 lg:py-6"
      }`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-xl shadow-black/5 overflow-hidden border border-zinc-100">
              <img src={logo} alt="KMA Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="font-['Playfair_Display'] font-black text-lg sm:text-4xl leading-[1.1] sm:leading-tight tracking-[-0.03em] flex flex-col sm:block">
              <span className="sm:inline">Kerala</span>
              <span className="sm:inline"> Mathematical</span>
              <span className="sm:inline"> Association</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3.5 focus-within:ring-2 focus-within:ring-black/5 transition-all w-64 lg:w-96 shadow-inner">
              <Search size={20} className="text-zinc-400 shrink-0" />
              <input 
                type="text" 
                placeholder="search for research papers..." 
                className="bg-transparent border-none focus:ring-0 text-base placeholder:text-zinc-400 ml-3 w-full outline-none font-medium"
              />
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/reader-dashboard')}
                  className="text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors"
                >
                  Dashboard
                </button>
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shadow-lg shadow-black/20">
                  {isSubscribed ? <Zap size={14} className="text-yellow-400 fill-yellow-400" /> : "R"}
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/auth')}
                  className="text-sm sm:text-base font-bold hover:text-zinc-600 transition-colors shrink-0 uppercase tracking-widest"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-black text-white text-sm sm:text-base font-black py-3 px-5 sm:py-4 sm:px-10 rounded-xl shadow-2xl shadow-black/20 hover:bg-zinc-800 transition-all active:scale-95 text-center leading-tight sm:leading-normal uppercase tracking-[0.1em]"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Get <br /> Started</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black text-white w-full overflow-hidden min-h-[85vh] flex items-center pt-24 pb-20 sm:pt-32 sm:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
            <div className="flex flex-col text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Advancing Pure <br /> & Applied <br /> Mathematics
              </h2>
              <p className="text-gray-400 mt-6 max-w-lg text-lg leading-relaxed">
                The Kerala Mathematical Association promotes advanced mathematical research and higher education through collaboration among scholars worldwide.
              </p>
              
              {!isSubscribed && (
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 mt-10 w-full sm:max-w-md shadow-2xl relative overflow-hidden group border-amber-500/20 bg-amber-500/5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap size={20} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Demo Upgrade Available</span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                      Experience full scholarly archive access temporarily during this session.
                    </p>
                    <button 
                      onClick={() => navigate(isLoggedIn ? '/reader-dashboard/get-subscription' : '/auth')}
                      className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.2em] hover:gap-4 transition-all"
                    >
                      Unlock Full Access <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full flex justify-center lg:justify-end">
              <div className="bg-white text-black rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md lg:max-w-lg space-y-6">
                <h3 className="text-3xl font-bold tracking-tight border-b border-zinc-100 pb-5">Reader Membership</h3>
                <div className="space-y-6">
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/10">
                      <BookOpen className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1.5">Full Archives</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">Unlock complete text of all research papers and historical journals in the KMA library.</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                      <Download className="text-black" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1.5">PDF Downloads</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">Download high-quality research papers for offline study and reference.</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                      <BadgePercent className="text-black" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1.5">Member Benefits</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">Receive notifications for new issues and save articles to your personal library.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Published Articles Section */}
      <section className="py-24 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-2 border-zinc-200 pb-8 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Scholarly Archive</h2>
              <p className="text-zinc-500 max-w-lg">Browse the latest peer-reviewed mathematical research published by the Association.</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] hover:text-blue-600 transition-colors w-fit">
              Explore All Papers <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {articles.map((art, i) => (
              <div key={i} className="group bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-zinc-100 transition-all" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex gap-3 mb-8">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{art.tag}</span>
                    <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest pt-1">VOL. {art.vol}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight min-h-[5rem] group-hover:text-black transition-colors">{art.title}</h3>
                  
                  <p className="text-zinc-500 text-sm mb-10 leading-relaxed line-clamp-3">
                    {art.abstract}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-8 pt-8 border-t border-zinc-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
                          <Users size={18} />
                        </div>
                        <span className="text-sm font-bold">{art.author}</span>
                      </div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{art.date}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleReadArticle(art)}
                      className={cn(
                        "w-full py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3",
                        isSubscribed 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100" 
                          : "bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10"
                      )}
                    >
                      {isSubscribed ? (
                        <>READ FULL ARTICLE <ChevronRight size={16} /></>
                      ) : (
                        <>UNLOCK PREVIEW <Lock size={14} /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-2xl shadow-white/5 overflow-hidden">
                  <img src={logo} alt="KMA Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="font-['Playfair_Display'] font-black text-2xl tracking-tight">Kerala Mathematical Association</h1>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                Promoting advanced mathematical research and peer-reviewed scholarly excellence since 1962. Join our global community of researchers and mathematicians.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Platform</h4>
              <div className="flex flex-col gap-3">
                {['Archives', 'Submit Paper', 'Reviewers', 'Membership', 'Pricing'].map(link => (
                  <button key={link} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors text-left w-fit">
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Legal</h4>
              <div className="flex flex-col gap-3">
                {[
                  'About Us',
                  'Contact Us',
                  'Privacy Policy',
                  'Terms & Conditions',
                  'Refund/Cancellation Policy'
                ].map(link => (
                  <button key={link} className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors text-left w-fit">
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Contact</h4>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 leading-relaxed uppercase tracking-wider">KMA Research Center</p>
                <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Trivandrum, Kerala, India</p>
                <p className="text-[10px] font-bold text-zinc-300 tracking-widest">support@kma.org.in</p>
              </div>
            </div>
          </div>
          <GlobalFooter showSocials={true} />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
