import "./checkout.css"
export default function Checkout (){



    return (

        <article id="page-layout-checkout">
            <div id="left-side">
                <section id="express-checkout">
                    <h1 className="header1">Express checkout</h1>
                    <div id="payment-options">
                        <div id="paypal">
                            <a
                                href="https://www.paypal.com/no/webapps/mpp/paypal-popup" title="Slik fungerer PayPal"
                                onClick="javascript:window.open('https://www.paypal.com/no/webapps/mpp/paypal-popup','WIPaypal',
                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,' +
                 ' width=1060, height=700'); return false;">
                                <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png"
                                     border="0"
                                     alt="PayPal Logo"
                                /></a>
                        </div>
                        <div id="klarna">
                            <a href="https://docs.klarna.com/" onClick="javascript:window.open('https://docs.klarna.com/' ,'WIPaypal',
                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,' +
                 ' width=1060, height=700'); return false;">
                                <img width="80" height="30" src="/images/klarnaXL.webp"
                                     alt="klarna"/></a>
                        </div>
                        <div id="other">
                            <button onClick="">other</button>
                        </div>
                    </div>
                </section>

                <div className="separator">Continue below to pay with credit card</div>
                <section id="billing">
                    <h1 className="header1">Contact information</h1>

                    <label htmlFor="email"></label><input className="large-input-field" type="text" id="email"
                                                          name="email input" placeholder="Email"/>
                    <h1 className="header1"> Billing</h1>
                    <form id="billing-input" action="https://web-tek.ninja/php_backend/dummy_login.php" method="post">
                        <input className="large-input-field" placeholder="country/region" type="text" id="country"
                               name="country-select"/>
                        <div className="small-input">
                            <input className="small-input-field" placeholder="First name" type="text" id="firstname"
                                   name="username"/>
                            <input className="small-input-field" type="text" placeholder="Last name" id="lastname"
                                   name="lastname"/>
                        </div>
                        <input className="large-input-field" placeholder="Credit card number" type="number"
                               name="Credit-card" id="credit-card"/>
                        <div className="small-input">
                            <input className="small-input-field" placeholder="Expiration date mm/yy" type="number"
                                   name="expiration date" id="exp-date"/>
                            <input className="small-input-field" placeholder="Security code" type="number"
                                   name="expiration date" id="sec-code"/>
                        </div>
                        <label htmlFor="lastname"></label>
                        <label htmlFor="firstname"></label>
                    </form>
                    <div id="purchase">
                        <p>Total cost: </p>
                        <label className="valuta">14 000</label>
                        <p>,- nok</p>
                        <button id="purchase-button">Purchase</button>
                    </div>

                </section>
            </div>
            <div id="right-side">
                <section id="checkout">
                    <h1 className="header1">product</h1>
                    <div className="product">
                        <h2 className="header2">introduction to SQL essentials</h2>
                        <div className="picture-and-text">
                            <img width="200" height="50" src="https://picsum.photos/150/150" alt="product image"/>
                            <p className="product-desc">
                                "Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="product-price">

                            <div className="product-pricetag">
                                <label>Price: </label>
                                <label>15 000</label>
                                <label className="valuta">,- nok</label>
                            </div>

                            <div className="purchase-discount">
                                <label className="discount-tag">Discount: </label>
                                <label>10%</label>
                            </div>

                            <div className="purchase-total-cost">
                                <label>Total cost: </label>
                                <label>14 000</label>
                                <label className="valuta">,- nok</label>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </article>
    )
}