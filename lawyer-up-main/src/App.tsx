import React, { useState, ElementType } from "react";
import {
  Shield,
  Globe,
  Database,
  ArrowRight,
  Lock,
  Eye,
  Download,
  Search,
  Upload,
  FileText,
  CheckCircle,
  User,
  ChevronRight,
  ChevronLeft,
  Server,
  Activity,
  LayoutDashboard,
  FolderUp,
  MessageSquare,
  Clock,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// --- TYPES FOR PROPS ---
interface NavbarProps {
  setPage: (page: string) => void;
  currentPage: string;
}

interface LandingPageProps {
  setPage: (page: string) => void;
}

interface SidebarItemProps {
  id: string;
  icon: ElementType;
  label: string;
  activeTab?: string;
  setActiveTab?: (id: string) => void;
}

// --- SHARED UI COMPONENTS ---

const Navbar = ({ setPage, currentPage }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (p: string) => {
    setPage(p);
    setMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 py-4 bg-[#0a192f]/90 border-b border-white/10 sticky top-0 z-50 h-[76px] backdrop-blur-sm">
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setPage("landing")}
      >
        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition shadow-[0_0_10px_rgba(37,99,235,0.3)]">
          <Shield className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold text-white tracking-tighter">
          IMMIGUARD
        </span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-6 items-center">
        <button
          onClick={() => setPage("customer-portal")}
          className={`text-sm font-bold transition ${
            currentPage === "customer-portal"
              ? "text-cyan-400"
              : "text-white/70 hover:text-white"
          }`}
        >
          CUSTOMER PORTAL
        </button>
        <button
          onClick={() => setPage("staff-portal")}
          className={`text-sm font-bold transition ${
            currentPage === "staff-portal"
              ? "text-cyan-400"
              : "text-white/70 hover:text-white"
          }`}
        >
          STAFF PORTAL
        </button>
        <button
          onClick={() => setPage("login")}
          className={`px-5 py-2 rounded-lg font-bold text-xs transition tracking-widest ${
            currentPage === "login"
              ? "bg-blue-800 text-white border border-cyan-500"
              : "bg-blue-600 hover:bg-blue-500 text-white"
          } shadow-[0_0_15px_rgba(37,99,235,0.4)]`}
        >
          LOGIN
        </button>
      </div>

      {/* Mobile: hamburger + dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg text-white hover:bg-white/10 transition"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#0f2341] border border-white/10 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => goTo("customer-portal")}
                className={`w-full text-left px-5 py-3 text-sm font-bold transition ${
                  currentPage === "customer-portal"
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                CUSTOMER PORTAL
              </button>
              <button
                onClick={() => goTo("staff-portal")}
                className={`w-full text-left px-5 py-3 text-sm font-bold transition ${
                  currentPage === "staff-portal"
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                STAFF PORTAL
              </button>
              <div className="border-t border-white/10 my-2" />
              <button
                onClick={() => goTo("login")}
                className="w-full text-left px-5 py-3 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg mx-2 transition"
              >
                LOGIN
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

// --- 1. THE LANDING PAGE ---
const LandingPage = ({ setPage }: LandingPageProps) => (
  <div className="animate-in fade-in duration-700 bg-[#0a192f]">
    {/* HERO SECTION */}
    <section className="relative pt-24 pb-32 px-6 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[#0a192f]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] tracking-[0.2em] font-bold mb-8 uppercase backdrop-blur-sm">
          <Shield size={12} className="text-cyan-400" /> 100% Private & Secure
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
          Secure Document Intake & <br />
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            Case Management.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Customer information is stored privately and secured away from public
          access. We provide a seamless, safe experience for your clients to
          upload documents, and a powerful dashboard for your staff to manage
          them.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => setPage("customer-portal")}
            className="bg-white hover:bg-slate-100 text-[#0a192f] px-10 py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl uppercase tracking-widest w-full sm:w-auto"
          >
            <User size={20} /> Customer Portal
          </button>
          <button
            onClick={() => setPage("staff-portal")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/30 uppercase tracking-widest w-full sm:w-auto"
          >
            <LayoutDashboard size={20} /> Staff Portal
          </button>
        </div>
      </div>
    </section>

    {/* TECHNICAL DETAILS SECTION */}
    <section className="bg-slate-50 py-24 px-6 relative z-20">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-black text-[#0a192f] tracking-tighter uppercase mb-4">
          Under the Hood: Enterprise Security
        </h2>
        <p className="text-slate-500 font-medium text-lg">
          For your IT and compliance teams: How we protect your data at a
          structural level.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-[#0f2341] border border-slate-700 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-start gap-8 relative overflow-hidden">
          {/* Subtle pop in the tech card */}
          <div className="absolute inset-0 bg-cyan-600/5 blur-[50px] rounded-full" />

          {/* Icon positioned on the left, tighter spacing */}
          <div className="relative z-10 flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-700/50 pb-8 md:pb-0 md:pr-10">
            <Database
              size={100}
              strokeWidth={1.5}
              className="text-cyan-500 opacity-90 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            />
          </div>

          {/* Text left-aligned and larger */}
          <div className="relative z-10 flex flex-col items-start text-left">
            <h3 className="text-white font-bold text-4xl mb-4">
              Encrypted VPC Storage
            </h3>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
              Data is isolated in a Virtual Private Cloud, inaccessible from the
              public internet, utilizing AES-256 encryption at rest and TLS 1.3
              in transit.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Activity size={32} />,
            title: "Secure Data Transfer",
            subtitle: "Encrypted in Transit",
            desc: "Files bypass public web servers entirely, traveling through a secure tunnel directly to the quarantine bay.",
          },
          {
            icon: <Server size={32} />,
            title: "Private Server Hosting",
            subtitle: "Isolated Data at Rest",
            desc: "We deploy to Virtual Private Clouds (VPCs) with no public IP addresses. Your data lives on dedicated, encrypted storage volumes.",
          },
          {
            icon: <Eye size={32} />,
            title: "Secure Case Management",
            subtitle: "Zero-Trust Access",
            desc: "Staff access is heavily regulated. Documents are viewed via self-destructing, time-limited URLs.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start text-left hover:-translate-y-1 transition-transform relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-600/5 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all blur-[50px]" />
            <div className="relative z-10">
              <div className="mb-6 text-cyan-600 bg-cyan-50 p-4 rounded-xl inline-block">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs font-black text-slate-400 tracking-[0.1em] uppercase mb-4">
                {item.subtitle}
              </p>
              <p className="text-slate-600 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// --- 2. THE CUSTOMER PORTAL ---
const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const SidebarItem = ({ id, icon: Icon, label }: SidebarItemProps) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-black tracking-widest uppercase transition-all ${
        activeTab === id
          ? "bg-blue-600/10 text-blue-600 border-r-4 border-blue-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="flex h-[calc(100vh-76px)] bg-slate-50 animate-in fade-in">
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col pt-8 hidden md:flex">
        <div className="px-6 mb-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Welcome back,
          </p>
          <p className="text-lg font-black text-[#0a192f] truncate">
            Maria Gonzalez
          </p>
        </div>
        <div className="flex-1 space-y-1">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Home" />
          <SidebarItem id="intake" icon={FolderUp} label="Upload Docs" />
          <SidebarItem id="messages" icon={MessageSquare} label="Messages" />
          <SidebarItem id="status" icon={Activity} label="Case Status" />
        </div>
        <div className="p-6 border-t border-slate-100">
          <button className="flex items-center gap-3 text-sm font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
            <LogOut size={18} /> Secure Logout
          </button>
        </div>
      </div>

      {/* Mobile: bottom nav for dashboard sections */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-pb flex justify-around py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {[
          { id: "dashboard", icon: LayoutDashboard, label: "Home" },
          { id: "intake", icon: FolderUp, label: "Upload" },
          { id: "messages", icon: MessageSquare, label: "Messages" },
          { id: "status", icon: Activity, label: "Status" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              activeTab === id
                ? "text-blue-600 bg-blue-50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-auto p-6 md:p-10 pb-24 md:pb-10">
        {activeTab === "dashboard" && (
          <div className="max-w-4xl animate-in slide-in-from-bottom-4">
            <h2 className="text-3xl md:text-4xl font-black text-[#0a192f] tracking-tighter uppercase mb-2">
              Applicant Dashboard
            </h2>
            <p className="text-slate-500 font-bold mb-10">
              Select an action to proceed with your case.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab("intake")}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition cursor-pointer group"
              >
                <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FolderUp size={24} />
                </div>
                <h3 className="font-black text-slate-800 uppercase tracking-tight mb-2">
                  Document Intake
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Securely upload your required legal evidence and IDs.
                </p>
              </div>

              <div
                onClick={() => setActiveTab("messages")}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition cursor-pointer group"
              >
                <div className="bg-emerald-50 text-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageSquare size={24} />
                </div>
                <h3 className="font-black text-slate-800 uppercase tracking-tight mb-2">
                  Communicate
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Send a secure, encrypted message to your legal team.
                </p>
              </div>

              <div
                onClick={() => setActiveTab("status")}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition cursor-pointer group"
              >
                <div className="bg-purple-50 text-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Activity size={24} />
                </div>
                <h3 className="font-black text-slate-800 uppercase tracking-tight mb-2">
                  Case Updates
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  View the real-time status of your immigration petition.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "intake" && (
          <div className="max-w-4xl animate-in slide-in-from-right-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden p-6 md:p-10 space-y-10">
              <div>
                <h3 className="text-2xl font-black text-[#0a192f] tracking-tighter uppercase">
                  Secure Vault Upload
                </h3>
                <p className="text-slate-400 font-bold text-sm mt-1">
                  Files are AES-256 encrypted before transmission.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Primary Government ID",
                  "Birth Certificate",
                  "Proof of Status",
                  "ICE Contact Form",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="group relative p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-black text-slate-800 uppercase text-sm tracking-tight">
                          {label}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mt-1">
                          PDF, JPG or PNG (Max 10MB)
                        </p>
                      </div>
                      <Upload
                        className="text-slate-300 group-hover:text-blue-500 transition"
                        size={24}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-[#0a192f] text-white py-5 rounded-xl font-black text-lg hover:bg-slate-800 transition shadow-xl tracking-widest uppercase"
                onClick={(e) => e.preventDefault()}
              >
                Submit to Secure Vault
              </button>
            </div>
          </div>
        )}

        {(activeTab === "messages" || activeTab === "status") && (
          <div className="max-w-4xl text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl animate-in slide-in-from-right-8">
            <Lock size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-black text-slate-800 uppercase">
              Module Locked
            </h3>
            <p className="text-slate-500 font-medium">
              This feature requires backend integration to preview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- CASE DATA (shared for list + profile) ---
const CASE_LIST = [
  {
    id: "IMM-904",
    name: "Juan Garcia",
    origin: "Mexico",
    status: "Review Required",
    email: "juan.garcia@example.com",
    submitted: "2024-01-15",
    notes: "Primary documents received. Awaiting secondary verification.",
  },
  {
    id: "IMM-903",
    name: "Ananya Patel",
    origin: "India",
    status: "Verified",
    email: "ananya.patel@example.com",
    submitted: "2024-01-12",
    notes: "All documents verified. Ready for next stage.",
  },
  {
    id: "IMM-902",
    name: "Liam Smith",
    origin: "UK",
    status: "Pending Docs",
    email: "liam.smith@example.com",
    submitted: "2024-01-10",
    notes: "Birth certificate and proof of address pending.",
  },
  {
    id: "IMM-901",
    name: "Elena Petrova",
    origin: "Ukraine",
    status: "Verified",
    email: "elena.petrova@example.com",
    submitted: "2024-01-08",
    notes: "Case in final review.",
  },
];

// --- 3. THE STAFF PORTAL ---
const StaffPortal = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const SidebarItem = ({ id, icon: Icon, label }: SidebarItemProps) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (id !== "cases") setSelectedCaseId(null);
      }}
      className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-black tracking-widest uppercase transition-all ${
        activeTab === id
          ? "bg-blue-600 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="flex h-[calc(100vh-76px)] bg-slate-50 animate-in fade-in">
      <div className="w-64 bg-[#0a192f] flex flex-col pt-8 shadow-2xl z-10 hidden md:flex">
        <div className="px-6 mb-8">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
            Admin Level 4
          </p>
          <p className="text-lg font-black text-white truncate">
            Agent Dashboard
          </p>
        </div>
        <div className="flex-1">
          <SidebarItem id="cases" icon={Users} label="Case Management" />
          <SidebarItem id="recent" icon={Clock} label="Recent Uploads" />
          <SidebarItem id="audit" icon={Shield} label="Audit Logs" />
        </div>
        <div className="p-6 border-t border-white/10">
          <button className="flex items-center gap-3 text-sm font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
            <LogOut size={18} /> Session End
          </button>
        </div>
      </div>

      {/* Mobile: bottom nav for staff tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a192f] border-t border-white/10 flex justify-around py-2 safe-area-pb">
        {[
          { id: "cases", icon: Users, label: "Cases" },
          { id: "recent", icon: Clock, label: "Uploads" },
          { id: "audit", icon: Shield, label: "Audit" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              if (id !== "cases") setSelectedCaseId(null);
            }}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              activeTab === id
                ? "text-cyan-400 bg-white/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-auto p-6 md:p-10 pb-24 md:pb-10 bg-slate-100">
        {activeTab === "cases" && (
          <div className="animate-in slide-in-from-bottom-4">
            {selectedCaseId ? (
              /* Case profile view */
              (() => {
                const c = CASE_LIST.find((x) => x.id === selectedCaseId);
                if (!c) return null;
                return (
                  <div className="max-w-2xl">
                    <button
                      onClick={() => setSelectedCaseId(null)}
                      className="flex items-center gap-2 text-slate-500 hover:text-[#0a192f] font-bold text-sm mb-6 transition"
                    >
                      <ChevronLeft size={18} /> Back to case list
                    </button>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                      <div className="bg-[#0a192f] px-6 py-6">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                          {c.id}
                        </p>
                        <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                          {c.name}
                        </h2>
                        <span
                          className={`inline-block mt-3 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                            c.status === "Verified"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="p-6 space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Email
                          </p>
                          <p className="font-bold text-slate-800">{c.email}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Country of origin
                          </p>
                          <p className="font-bold text-slate-800">{c.origin}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Submitted
                          </p>
                          <p className="font-bold text-slate-800">{c.submitted}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Case notes
                          </p>
                          <p className="font-medium text-slate-600 text-sm leading-relaxed">
                            {c.notes}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition flex items-center gap-2">
                            <FileText size={16} /> View documents
                          </button>
                          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest transition flex items-center gap-2">
                            <MessageSquare size={16} /> Message applicant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#0a192f] tracking-tighter uppercase mb-2">
                      Master Case List
                    </h1>
                    <div className="flex gap-4 items-center">
                      <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-200">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />{" "}
                        Live DB Sync
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-black text-sm transition flex items-center gap-2 shadow-lg shadow-blue-600/20 uppercase tracking-widest w-full md:w-auto justify-center">
                    <Download size={18} /> Export List
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-[#0a192f] text-white/50 text-[10px] font-black tracking-[0.2em] uppercase">
                      <tr>
                        <th className="p-6">Applicant ID</th>
                        <th className="p-6">Name</th>
                        <th className="p-6">Country</th>
                        <th className="p-6">Status</th>
                        <th className="p-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                      {CASE_LIST.map((t) => (
                        <tr
                          key={t.id}
                          onClick={() => setSelectedCaseId(t.id)}
                          className="hover:bg-blue-50/50 transition group cursor-pointer"
                        >
                          <td className="p-6 font-mono text-xs text-blue-600 font-black underline decoration-blue-400/50">
                            {t.id}
                          </td>
                          <td className="p-6 text-slate-900">{t.name}</td>
                          <td className="p-6 text-slate-400">{t.origin}</td>
                          <td className="p-6">
                            <span
                              className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${
                                t.status === "Verified"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <span className="text-blue-600 group-hover:text-blue-800 inline-flex items-center gap-2 ml-auto text-xs font-black uppercase tracking-widest">
                              Open File <ChevronRight size={14} />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {(activeTab === "recent" || activeTab === "audit") && (
          <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-300 rounded-3xl animate-in slide-in-from-right-8 bg-slate-50/50">
            <div className="text-center">
              <Database size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-black text-slate-800 uppercase">
                Awaiting DB Connection
              </h3>
              <p className="text-slate-500 font-medium">
                Table generation requires live SQL data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. THE LOGIN PAGE ---
const LoginPage = ({ setPage }: { setPage: (page: string) => void }) => (
  <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-6 animate-in zoom-in-95 duration-500">
    <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <div className="bg-[#0a192f] p-8 text-center relative">
        <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
          <Lock className="text-white" size={28} />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
          System Access
        </h2>
        <p className="text-blue-400 text-[10px] font-black tracking-[0.2em] mt-2 uppercase">
          Zero-Trust Gateway
        </p>
      </div>
      <div className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage("staff-portal");
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Corporate Email
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                placeholder="name@firm.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none font-bold text-slate-700 transition"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Password / Security Key
            </label>
            <div className="relative">
              <Shield
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none font-bold text-slate-700 transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 uppercase tracking-widest mt-4 flex items-center justify-center gap-2"
          >
            Authenticate Session <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  </div>
);

// --- MAIN CONTROLLER ---
export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div className="min-h-screen bg-[#0a192f] font-sans selection:bg-cyan-600 selection:text-white flex flex-col overflow-hidden">
      <Navbar setPage={setPage} currentPage={page} />
      <main className="flex-grow overflow-auto">
        {page === "landing" && <LandingPage setPage={setPage} />}
        {page === "customer-portal" && <CustomerPortal />}
        {page === "staff-portal" && <StaffPortal />}
        {page === "login" && <LoginPage setPage={setPage} />}
      </main>
    </div>
  );
}
