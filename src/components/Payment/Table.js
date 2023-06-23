const PaymentTable = ({ data, gotoDetails }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>PAGE NAME</th>
          <th>AMOUNT</th>
          <th>DATE</th>
          {/* <th>ACTION</th> */}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            key={item._id}
            onClick={() => gotoDetails(item.paymentSlug, item._id)}
          >
            <td>{item.pageName}</td>
            <td>{parseFloat(item.amount).toFixed(6)}</td>
            <td>{item.createdAt}</td>
            {/* <td>
              <img src={Actions} alt={"Actions"} />
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
