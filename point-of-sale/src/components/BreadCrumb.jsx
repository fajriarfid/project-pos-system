import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";

const BreadCrumb = ({ items }) => {
  return (
    <div
      className="d-flex align-center gap-2 flex-wrap"
      style={{ margin: "0.5rem 0" }}
    >
      {items.map((item, index) => (
        <div key={index} className="d-flex align-center">
          {index > 0 && (
            <ChevronRight
              size={16}
              style={{ margin: "0 0.25rem", color: "var(--gray-400)" }}
            />
          )}

          {item.link ? (
            <Link
              to={item.link}
              style={{
                color: "var(--gray-600)",
                fontSize: "0.875rem",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "var(--gray-600)")
              }
            >
              {item.label}
            </Link>
          ) : (
            <span
              style={{
                fontWeight: index === items.length - 1 ? "500" : "400",
                color:
                  index === items.length - 1
                    ? "var(--gray-900)"
                    : "var(--gray-600)",
                fontSize: "0.875rem",
              }}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
