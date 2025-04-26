import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiMapPin, FiStar } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";

const Address = ({
  address,
  onSelect,
  isSelected,
  onDelete,
  onSetDefault,
  hideControls = false,
  showShippingCost = false,
  shippingCost = 0,
}) => {
  const StarIcon = address.isDefault ? FiStar : FaRegStar;

  return (
    <div
      className={`mb-3 p-4 ${isSelected ? "bg-primary-light" : ""}`}
      style={{
        border: isSelected
          ? "2px solid var(--primary)"
          : address.isDefault
          ? "2px solid var(--success)"
          : "1px solid var(--gray-200)",
        borderRadius: "var(--radius)",
        cursor: onSelect ? "pointer" : "default",
        transition: "all 0.2s",
      }}
      onClick={onSelect ? () => onSelect(address.id) : undefined}
    >
      <div className="d-flex justify-between mb-2">
        <div className="d-flex gap-2 align-center">
          <FiMapPin size={18} style={{ color: "var(--primary)" }} />
          <h4 style={{ fontWeight: "600" }}>{address.name}</h4>
          {address.isDefault && (
            <span className="badge badge-success">Default</span>
          )}
          {isSelected && <span className="badge badge-primary">Selected</span>}
        </div>
        {!hideControls && (
          <div className="d-flex gap-2">
            {!address.isDefault && onSetDefault && (
              <button
                className="btn btn-sm btn-outline d-flex align-center"
                style={{ color: "var(--success)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSetDefault(address.id);
                }}
                title="Set as default address"
              >
                <StarIcon size={16} />
              </button>
            )}
            {onDelete && (
              <button
                className="btn btn-sm btn-outline d-flex align-center"
                style={{ color: "var(--danger)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(address.id);
                }}
                title="Delete address"
              >
                <FiTrash2 size={16} />
              </button>
            )}
            <Link
              to={`/account/addresses/${address.id}`}
              onClick={(e) => e.stopPropagation()}
              className="btn btn-sm btn-outline d-flex align-center"
              title="Edit address"
            >
              <FiEdit2 size={16} />
            </Link>
          </div>
        )}
      </div>
      <p style={{ color: "var(--gray-700)", paddingLeft: "26px" }}>
        {address.province}, {address.regency}, {address.district},{" "}
        {address.village}, {address.detail}
      </p>

      {showShippingCost && (
        <div className="mt-2 d-flex justify-end">
          <span
            className="badge"
            style={{
              backgroundColor: "var(--gray-100)",
              color: "var(--gray-800)",
              padding: "6px 10px",
              fontSize: "14px",
            }}
          >
            Biaya Pengiriman: Rp {shippingCost.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Address;
