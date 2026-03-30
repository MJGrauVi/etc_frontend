import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      <ol className="flex items-center space-x-2">

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            
            {/* Enlace */}
            {item.to ? (
              <Link 
                to={item.to} 
                className="hover:text-orange-500 transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}

            {/* Separador */}
            {index < items.length - 1 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mx-2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            )}

          </li>
        ))}

      </ol>
    </nav>
  );
}
