import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm font-medium text-slate-blue/60 mb-8 py-2">
      <Link to="/" className="hover:text-brand-walnut flex items-center gap-1 transition-colors">
        <Home size={14} />
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center gap-2 capitalize">
            <ChevronRight size={14} className="text-slate-blue/30" />
            {isLast ? (
              <span className="text-brand-walnut font-bold">{name.replace(/-/g, " ")}</span>
            ) : (
              <Link to={routeTo} className="hover:text-brand-walnut transition-colors">
                {name.replace(/-/g, " ")}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
