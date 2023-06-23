const Cryptocurrency = ({ wallets }) => {
  return (
    <div className="crypto">
      {wallets?.map((item) => (
        <div className="crypto_item" key={item.id}>
          <div className="crypto_img crypto_img-3">
            <img src={item.img} alt="Bitcoin" />
          </div>
          <div className="crypto_content">
            <p className="title title-grey">{item.name} Wallet</p>
            <p className="title title-grey">
              {parseFloat(item.balance).toFixed(6)} {item.symbol}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cryptocurrency;
