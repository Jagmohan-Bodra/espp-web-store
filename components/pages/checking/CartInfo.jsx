const CartInfo = (props) => {
  const {data, params} = props;

  const total = data.reduce((total, item) => {
    const {publicPrice, membershipPrice} = item.product || {};
    const price =
      Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
        ? membershipPrice
        : publicPrice;
    return total + price * parseFloat(item.quantity);
  }, 0);
  const shipping =
    params.shippingFee == 0
      ? 'Free'
      : params.shippingFee > 0
      ? `S$${params.shippingFee}`
      : 'Calculated at next step';
  const totalResult = total + (params.shippingFee || 0);

  return (
    <div className={`cart-info`}>
      {data.map((item, index) => {
        const {quantity, product} = item;
        const {imageFullPaths, name, colors, membershipPrice, publicPrice} =
          product || {};
        const privatePrice =
          Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
            ? membershipPrice
            : undefined;
        return (
          <div className={`cart-info_table`} key={index}>
            <div className="d-table cart-info_table__row">
              <div className="d-table-cell cart-info_table__col col__title">
                <div className={`cart-info_table__col_group_img`}>
                  <img
                    src={(imageFullPaths || [])[0]}
                    className={`cart-info_table__col_group_img_img`}
                  />
                  <span className={`cart-info_table__col_group_img_notif`}>
                    {quantity || 0}
                  </span>
                </div>
              </div>
              <div className="d-table-cell cart-info_table__col col__title">
                <div>{name || ''}</div>
                <div>
                  COLOR: {(colors || []).map((color) => color.name).join(' ,')}
                </div>
              </div>
              <div className="d-table-cell cart-info_table__col col__title">
                <span
                  style={privatePrice ? {textDecoration: 'line-through'} : {}}>
                  S${publicPrice}
                </span>
                <span className={`current_price_private`}>
                  {privatePrice ? `S$${privatePrice}` : ''}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <hr style={{marginTop: '2rem'}} />
      {/* <div className={`cart-info_voucher`}>
        <input
          placeholder={`Enter Voucher Code`}
          className={`cart-info_voucher_input`}
        />
        <button className={`cart-info_voucher_btn`}>Apply</button>
      </div>
      <hr style={{marginTop: '2rem'}} /> */}
      <div className={`cart-info_sub_total`}>
        <div className={`cart-info_sub_total_space`}>
          <div>Subtotal</div>
          <div className={`cart-info_sub_total_space_value`}>S${total}</div>
        </div>
        <div className={`cart-info_sub_total_space`}>
          <div>Shipping</div>
          <div>{shipping}</div>
        </div>
      </div>
      <hr style={{marginTop: '2rem', borderTop: '2px solid rgba(0,0,0,.1)'}} />
      <div className={`cart-info_total`}>
        <div className={`cart-info_total_text`}>Total</div>
        <div className={`cart-info_total_value`}>S${totalResult}</div>
      </div>
    </div>
  );
};

CartInfo.defaultProps = {
  data: [],
};

export default CartInfo;
