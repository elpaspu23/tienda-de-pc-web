import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index > 0 && <ChevronRight size={14} className="breadcrumb-sep" />}
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
