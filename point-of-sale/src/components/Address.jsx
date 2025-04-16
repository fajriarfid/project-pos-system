import { Link } from "react-router-dom";
import { Edit2, Trash2, MapPin } from "react-feather";

const Address = ({ address, onSelect, isSelected, onDelete }) => {
  return (
    <div
      className={`mb-3 p-4 ${isSelected ? "bg-primary-light" : ""}`}
      style={{
        border: isSelected
          ? "2px solid var(--primary)"
          : "1px solid var(--gray-200)",
        borderRadius: "var(--radius)",
        cursor: onSelect ? "pointer" : "default",
        transition: "all 0.2s",
      }}
      onClick={onSelect ? () => onSelect(address.id) : undefined}
    >
      <div className="d-flex justify-between mb-2">
        <div className="d-flex gap-2 align-center">
          <MapPin size={18} style={{ color: "var(--primary)" }} />
          <h4 style={{ fontWeight: "600" }}>{address.name}</h4>
          {isSelected && <span className="badge badge-primary">Selected</span>}
        </div>
        <div className="d-flex gap-2">
          {onDelete && (
            <button
              className="btn btn-sm btn-outline d-flex align-center"
              style={{ color: "var(--danger)" }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(address.id);
              }}
            >
              <Trash2 size={16} />
            </button>
          )}
          <Link
            to={`/account/addresses/${address.id}`}
            onClick={(e) => e.stopPropagation()}
            className="btn btn-sm btn-outline d-flex align-center"
          >
            <Edit2 size={16} />
          </Link>
        </div>
      </div>
      <p style={{ color: "var(--gray-700)", paddingLeft: "26px" }}>
        {address.province}, {address.regency}, {address.district},{" "}
        {address.village}, {address.detail}
      </p>
    </div>
  );
};

export default Address;
