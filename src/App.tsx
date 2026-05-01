/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Home from "@/src/pages/Home";
import About from "@/src/pages/About";
import Domains from "@/src/pages/Domains";
import DomainDetail from "@/src/pages/DomainDetail";
import SubDomainDetail from "@/src/pages/SubDomainDetail";
import Projects from "@/src/pages/Projects";
import ProjectDetail from "@/src/pages/ProjectDetail";
import Solutions from "@/src/pages/Solutions";
import Products from "@/src/pages/Products";
import { AuthProvider } from "@/src/lib/AuthContext";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import Login from "@/src/pages/Login";
import Signup from "@/src/pages/Signup";
import Contact from "@/src/pages/Contact";
import EnquiryForm from "@/src/pages/EnquiryForm";
import Dashboard from "@/src/pages/Dashboard";
import AdminLayout from "@/src/components/admin/AdminLayout";
import AdminDashboard from "@/src/pages/admin/Dashboard";

// Placeholder for other routes
const ComingSoon = ({ title }: { title: string }) => (
  <div className="pt-40 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
    <h1 className="text-4xl font-display font-bold text-slate-blue mb-4">{title}</h1>
    <p className="text-slate-blue/60 mb-8">This module is currently being configured.</p>
    <div className="px-6 py-2 bg-brand-walnut/10 text-brand-walnut rounded-full font-bold">Coming Soon</div>
  </div>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin Routes with nested layout */}
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="cms" element={<ComingSoon title="CMS Engine" />} />
                    <Route path="domains" element={<ComingSoon title="Domain Engine" />} />
                    <Route path="solutions" element={<ComingSoon title="Solutions Engine" />} />
                    <Route path="projects" element={<ComingSoon title="Projects Engine" />} />
                    <Route path="products" element={<ComingSoon title="Products Engine" />} />
                    <Route path="leads" element={<ComingSoon title="CRM / Leads" />} />
                    <Route path="media" element={<ComingSoon title="Media Manager" />} />
                    <Route path="users" element={<ComingSoon title="Users & Roles" />} />
                    <Route path="settings" element={<ComingSoon title="System Settings" />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* Public/Member Routes with standard layout */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* Phase 2 Routes */}
                    <Route path="/domains" element={<Domains />} />
                    <Route path="/domains/:domain" element={<DomainDetail />} />
                    <Route path="/domains/:domain/:subdomain" element={<SubDomainDetail />} />
                    
                    {/* Phase 3 Routes */}
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/domains/:domain/:subdomain/:project" element={<ProjectDetail />} />
                    
                    {/* Phase 4 Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Member Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/enquiry" element={<ProtectedRoute><EnquiryForm /></ProtectedRoute>} />
                    <Route path="/get-quote" element={<ProtectedRoute><EnquiryForm /></ProtectedRoute>} />
                    <Route path="/book-demo" element={<ProtectedRoute><ComingSoon title="Book Demo" /></ProtectedRoute>} />
                    <Route path="/consultation" element={<ProtectedRoute><ComingSoon title="Consultation" /></ProtectedRoute>} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
