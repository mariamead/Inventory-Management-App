import "./lowStockAlert.css"
import { useLowStock } from "../../hooks/useLowStock";


function QuantityEditor({
  value,
  onChange
}: {
  value: number;
  onChange: (newValue: number) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    />
  );
}

function LowStockAlerts() {
	const { items, error, loading, updateQuantity, removeItem } = 
	useLowStock();

    return (
        <section className="low-stock-alerts">
          <h2>Low stock Alert</h2>

      	{loading && <p>Loading...</p>}
      	{error && <p className="error">{error}</p>}

          {items.length === 0? (
            <p>All items are sufficiently stocked</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="low-stock-body">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                  
                    <td>
                      <QuantityEditor
                        value={item.quantity}
                        onChange={newQuantity => {
                        	updateQuantity(item, newQuantity);
                        }}
                      />
                    </td>
                    <td>
                      {item.quantity === 0 ? "Out of Stock" : "Low Stock"}
                    </td>

                    <td>
                      <button
                        onClick={() => removeItem(item.id)}
                      > 
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
    );
}
export default LowStockAlerts;