import "./checkout.css"
import {useParams} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../userContext";
import {createPortal} from "react-dom";
import Login from "../component/modals/auth/login";
import Register from "../component/modals/auth/register";
import {useSelector} from "react-redux";

export default function Checkout() {
   // const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState()
    const [showSignupModal, setShowSignupModal] = useState()
    const {id} = useParams();
    const user = useContext(UserContext);
    const courseData = useSelector((state) => state.data.sharedObject)

    const handlePurchase =  ( ) => {
        fetch(`http://localhost:8080/api/transaction/offerId/${courseData.id}/userid/${1}`, {method:'POST'})
            .then(data => console.log(data))
            .catch(err => console.error('Error fetching data:', err));
    }
   /* document.getElementById("exp-date").addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    })
*/
    function loggedIn(){
        if(user == null){
                setShowLoginModal(true)
        }
    }
    return (
        <article id="page-layout-checkout" onLoad={loggedIn}>

            <div id="checkout-left-side">
                <section id="express-checkout">
                    <h4 className="checkout-headers">Express checkout</h4>
                    <div id="payment-options">
                        <div id="paypal">
                            <a
                                href="https://www.paypal.com/no/webapps/mpp/paypal-popup" title="Slik fungerer PayPal"
                                onClick="javascript:window.open('https://www.paypal.com/no/webapps/mpp/paypal-popup','WIPaypal',
                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,' +
                 ' width=1060, height=700'); return false;">
                                <img id="paypal-image"
                                     src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png"
                                     border="0"
                                     alt="PayPal Logo"
                                /></a>
                        </div>
                        <div id="klarna">
                            <a href="https://docs.klarna.com/" onClick="javascript:window.open('https://docs.klarna.com/' ,'WIPaypal',
                'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes,' +
                 ' width=1060, height=700'); return false;">
                                <img id="klarna-image" src="/images/klarnaXL.webp" alt="klarna"/></a>
                        </div>
                        <div id="other">
                            <button onClick="">other</button>
                        </div>
                    </div>
                </section>

                <div className="separator">Continue below to pay with credit card</div>
                <section id="billing">
                    <h5 className="checkout-headers">Contact information</h5>
                    <label htmlFor="email"></label>
                    <input className="large-input-field" type="text" id="email" name="email input" placeholder="Email"/>
                    <h5 className="checkout-headers"> Billing</h5>
                    <form id="billing-input" method="post">
                        <input required={true}
                               className="large-input-field"
                               placeholder="country/region"
                               type="text"
                               id="country"
                               name="country-select"/>
                        <div className="small-input">
                            <input required={true}
                                   className="small-input-field"
                                   placeholder="First name"
                                   type="text"
                                   id="firstname"
                                   name="username"/>
                            <input required={true}
                                   className="small-input-field"
                                   type="text"
                                   placeholder="Last name"
                                   id="lastname"
                                   name="lastname"/>
                        </div>
                        <input required={true}
                               className="large-input-field"
                               placeholder="Credit card number"
                               type="number"
                               name="Credit-card"
                               id="credit-card"/>
                        <div className="small-input">
                            <input required={true}
                                   className="small-input-field"
                                   placeholder="Expiration date mm/yy"
                                   type="text"
                                   name="expiration date"
                                   maxLength={5}
                                   id="exp-date"/>
                            <input required={true}
                                   className="small-input-field"
                                   placeholder="Security code"
                                   type="number"
                                   name="expiration date"
                                   maxLength={3}
                                   id="sec-code"/>
                        </div>
                        <label htmlFor="lastname"></label>
                        <label htmlFor="firstname"></label>
                        <div id="purchase">
                            <p>Total cost:</p> &nbsp;
                            <label className="valuta">
                                {(courseData.price * (1 - courseData.discount)).toFixed(2)}
                            </label><p>,- nok</p>
                            <button type="submit" id="purchase-button" onClick={handlePurchase}>Purchase</button>
                        </div>
                    </form>


                </section>
            </div>
            <div id="checkout-right-side">
                <section id="checkout">
                    <h5 className="checkout-headers">product</h5>
                    <div className="product">
                        <h6 className="checkout-headers">{courseData.course.title}</h6>
                        <div className="picture-and-text">
                            <img className="product-checkout-image" width="200" height="100"
                                 src={courseData.course.imgLink} alt="product image"/>
                            <p className="product-desc">{courseData.course.description} </p>
                        </div>
                        <div className="product-price">
                            <div className="product-pricetag">
                                <label>Price: </label>
                                <label>{courseData.price}</label>
                                <label className="valuta">,- nok</label>
                            </div>

                            <div className="purchase-discount">
                                <label className="discount-tag">Discount: </label>
                                <span>{(courseData.discount * 100).toFixed(0)}%</span>
                            </div>

                            <div className="purchase-total-cost">
                                <label>Total cost: </label>
                                <label>{(courseData.price * (1 - courseData.discount)).toFixed(2)}</label>
                                <label className="valuta">,- nok</label>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            {
                showLoginModal && createPortal(
                    <Login changeMode={() => {
                        setShowSignupModal(true)
                        setShowLoginModal(false)
                    }} onClose={() => setShowLoginModal(false)} closable={false}/>,
                    document.getElementById("auth-modal")
                )
            }
            {
                showSignupModal && createPortal(
                    <Register changeMode={() => {
                        setShowLoginModal(true)
                        setShowSignupModal(false)
                    }} onClose={() => setShowSignupModal(false)} closable={false}/>,
                    document.getElementById("auth-modal")
                )
            }
        </article>
    )
}