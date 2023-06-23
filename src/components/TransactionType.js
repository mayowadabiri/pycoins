const TransactionType = ({ tableType, setCrypto, setFiat }) => {
  return (
    <div className="cryptodetails_buttons">
      <button
        className={`nav-text ${tableType === 'crypto' && 'settings_active'}`}
        onClick={setCrypto}
      >
        Crypto Transaction
      </button>
      <button
        className={`nav-text ${tableType === 'fiat' && 'settings_active'}`}
        onClick={setFiat}
      >
        Fiat Transaction
      </button>
    </div>
  );
};

export default TransactionType;
