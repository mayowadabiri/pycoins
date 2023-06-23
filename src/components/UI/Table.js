import Received from "../../assets/received.svg";
import Sent from "../../assets/sent.svg";

const Table = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <div className={item.type === "Sent" ? "sent" : "received"}>
                <img src={item.type === "Sent" ? Sent : Received} alt="Icon" />
              </div>
              <p>{item.name}</p>
            </td>
            <td>{item.amount}</td>
            <td>{item.date}</td>
            <td>
              <span
                className={
                  item.status === "Failed"
                    ? "failed"
                    : item.status === "Pending"
                    ? "pending"
                    : "success"
                }
              >
                {" "}
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
