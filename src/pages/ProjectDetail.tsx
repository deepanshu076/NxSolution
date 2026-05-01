import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "@/src/constants/projects";
import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import { CheckCircle2, Calendar, FileText, BarChart3, ChevronRight, Play, Info, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ProjectDetail() {
  const { project: slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);
  const [activeVideo, setActiveVideo] = useState(true);

  if (!project) return <Navigate to="/projects" />;

  const relatedProjects = projectsData
    .filter((p) => p.domainId === project.domainId && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs />

        {/* §2 Hero Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {["domainId", "subdomainSlug", "type", "status"].map((key) => (
                <span key={key} className="px-4 py-2 bg-brand-walnut/10 text-brand-walnut text-xs font-bold uppercase tracking-widest rounded-full">
                  {key === "type" ? project.type : (project as any)[key]}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-blue leading-[1.1]">
              {project.title}.
            </h1>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
             <div className="lg:col-span-3 aspect-video bg-deep-navy rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-pure-white">
                <iframe 
                  className="w-full h-full"
                  src={project.videoUrl}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
             </div>
             <div className="flex flex-col gap-4">
                <div className="bg-light-cream p-8 rounded-[2rem] border border-cool-gray/50 flex-grow">
                   <h4 className="font-bold text-slate-blue mb-4 flex items-center gap-2"><Info size={18} /> Quick Context</h4>
                   <ul className="space-y-4">
                      <li className="text-xs font-medium text-slate-blue/60 uppercase tracking-widest flex justify-between">Year: <span className="text-slate-blue">{project.year}</span></li>
                      <li className="text-xs font-medium text-slate-blue/60 uppercase tracking-widest flex justify-between">Status: <span className="text-brand-walnut">{project.status}</span></li>
                      <li className="text-xs font-medium text-slate-blue/60 uppercase tracking-widest flex justify-between">Domain: <span className="text-slate-blue">{project.domainId}</span></li>
                   </ul>
                   <div className="mt-8 pt-8 border-t border-cool-gray/50 space-y-4">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                           <div className="text-2xl font-bold text-brand-walnut">{m.value}</div>
                           <div className="text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest">{m.label}</div>
                        </div>
                      ))}
                   </div>
                </div>
                <Link to="/get-quote" className="bg-brand-walnut text-pure-white text-center py-6 rounded-3xl font-bold hover:bg-brand-black transition-all">
                   Request System Specs
                </Link>
             </div>
          </div>
        </section>

        {/* §3 & §5 Overview & Project Details */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
           <div className="lg:col-span-2">
              <h2 className="text-3xl font-display font-bold text-slate-blue mb-8 italic">Project Overview</h2>
              <p className="text-lg text-slate-blue/70 mb-12 leading-relaxed">{project.overview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                 <div className="p-10 bg-pure-white rounded-[3rem] border border-cool-gray/50 walnut-glow">
                    <h4 className="text-xl font-bold text-slate-blue mb-6 flex items-center gap-2"><FileText size={20} className="text-brand-walnut" /> Requirements</h4>
                    <ul className="space-y-4">
                       {project.requirements.map((req, i) => (
                         <li key={i} className="flex gap-3 text-sm text-slate-blue/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-walnut mt-1.5 shrink-0" />
                            {req}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="p-10 bg-pure-white rounded-[3rem] border border-cool-gray/50 walnut-glow">
                    <h4 className="text-xl font-bold text-slate-blue mb-6 flex items-center gap-2"><CheckCircle2 size={20} className="text-brand-walnut" /> Solution Delivered</h4>
                    <ul className="space-y-4">
                       {project.implementation.map((imp, i) => (
                         <li key={i} className="flex gap-3 text-sm text-slate-blue/70 font-medium">
                            <CheckCircle2 size={14} className="text-brand-walnut mt-1 shrink-0" />
                            {imp}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* §8 Before / After */}
              <div className="mb-16">
                 <h2 className="text-3xl font-display font-bold text-slate-blue mb-10 italic">Transformation Matrix</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-cool-gray/20 p-8 rounded-[2.5rem]">
                       <div className="text-xs font-bold text-slate-blue/40 uppercase tracking-[0.2em] mb-6">Before Deployment</div>
                       <ul className="space-y-4">
                          {project.beforeAfter.before.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-blue/50">
                               <span className="text-red-500 font-bold shrink-0">X</span>
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="bg-brand-walnut/5 p-8 rounded-[2.5rem] border border-brand-walnut/20">
                       <div className="text-xs font-bold text-brand-walnut uppercase tracking-[0.2em] mb-6">Intelligent State</div>
                       <ul className="space-y-4">
                          {project.beforeAfter.after.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-blue font-medium">
                               <CheckCircle2 size={14} className="text-brand-walnut mt-1 shrink-0" />
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>

              {/* §9 Impact Data */}
              <div className="p-12 bg-brand-walnut rounded-[4rem] text-pure-white text-center">
                 <BarChart3 size={48} className="mx-auto mb-8 opacity-40" />
                 <h3 className="text-3xl font-bold mb-6">Direct Impact</h3>
                 <p className="text-2xl font-display italic opacity-80 leading-relaxed">"{project.impact}"</p>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-slate-blue p-10 rounded-[3rem] text-pure-white">
                 <h4 className="text-xl font-bold mb-8 italic">Performance Metrics</h4>
                 <div className="space-y-8">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                         <div className="text-sm opacity-60 font-medium">{m.label}</div>
                         <div className="text-3xl font-display font-bold text-brand-walnut">{m.value}</div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-10 bg-light-cream rounded-[3rem] border border-cool-gray/30">
                 <h4 className="text-xl font-bold text-slate-blue mb-8 italic">Related Projects</h4>
                 <div className="space-y-6">
                    {relatedProjects.length > 0 ? relatedProjects.map((rel) => (
                      <Link key={rel.id} to={`/domains/${rel.domainId}/${rel.subdomainSlug}/${rel.slug}`} className="group block">
                        <div className="text-xs font-bold text-brand-walnut mb-1 uppercase tracking-widest">{rel.subdomainSlug}</div>
                        <div className="font-bold text-slate-blue group-hover:text-brand-walnut transition-colors">{rel.title}</div>
                        <div className="text-[10px] text-slate-blue/40 mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">View Project <ChevronRight size={10} /></div>
                      </Link>
                    )) : (
                      <div className="text-slate-blue/40 text-sm">No related projects in this domain.</div>
                    )}
                 </div>
              </div>
           </div>
        </section>

        {/* §12 CTA */}
        <section className="text-center py-20 bg-brand-black rounded-[4rem] text-pure-white overflow-hidden relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#6B4F3A_0%,_transparent_50%)] opacity-20" />
           <div className="relative z-10 max-w-2xl mx-auto px-6">
              <h2 className="text-4xl font-display font-bold mb-8">Want a Similar System?</h2>
              <p className="opacity-60 mb-12">Our engineers can customize the {project.title} architecture for your specific environment.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link to="/get-quote" className="bg-brand-walnut px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3">
                    <MessageSquare size={20} /> Request Customization
                 </Link>
                 <Link to="/book-demo" className="bg-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-colors">
                    Book Live Demo
                 </Link>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
