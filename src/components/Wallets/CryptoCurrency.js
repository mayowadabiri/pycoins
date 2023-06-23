import { Link } from "react-router-dom";

import Continue from "../../assets/continue.svg";

const Cryptocurrency = ({ wallets }) => {
  return (
    <div className="wallets_crypto-list">
      {wallets?.map((item) => (
        <Link
          to={{
            pathname: `/wallets/${item.slug}`,
          }}
          className="wallets_crypto-item"
          key={item.id}
        >
          <div className="wallets_crypto-header">
            <div className="crypto_img crypto_img-2">
              <img src={item.img} alt={item.name} />
            </div>
            <p className="mute">{item.name} Wallet</p>
          </div>
          <div className="wallets_crypto-footer">
            <p className="title title-grey">
              {parseFloat(item.balance).toFixed(6)} {item.symbol}
            </p>
            <img src={Continue} alt="proceed" />
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Cryptocurrency;
