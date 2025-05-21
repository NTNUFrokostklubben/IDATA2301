import "./checkout.css"
import {useNavigate} from "react-router-dom";
import React, {useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Login from "../../component/modals/auth/login";
import Register from "../../component/modals/auth/register";
import {useSelector} from "react-redux";
import Select from 'react-select'
import countryList from "react-select-country-list";
import {AsyncApiRequest} from "../../utils/requests";
import SpinnerLoader from "../../component/modals/Spinner/spinnerLoader";
import {getAuthenticatedUser} from "../../utils/authentication/authentication";


export default function Checkout() {

    const [loading, setLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(Boolean)
    const [showSignupModal, setShowSignupModal] = useState(Boolean)
    const courseData = useSelector((state) => state.data.sharedObject)
    const userData = useSelector((state) => state.data.user)
    const [countrySelect, setCountrySelect] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const [cardNumber, setCardNumber] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // TODO remove this - Only for development
    const required = true;


    const handlePurchase = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const status = await AsyncApiRequest("POST", `/transaction/offerId/${courseData.id}`, null);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            navigate('/order-complete');
        }
    }

    const handleExpiration = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    };

    const handleCVC = (e) => {
         // Remove non-digits
        e.target.value = e.target.value.replace(/\D/g, "");
    };

    const handleCardNr = (e) => {
        const input = e.target.value;

        // 1. Remove all non-digit characters
        const digitsOnly = input.replace(/\D/g, '');


        // 3. Add space after every 4 digits
        const formatted = digitsOnly.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')

        setCardNumber(formatted);
    }

    function loggedIn(){
        let user = getAuthenticatedUser();
        if(user == null){
                setShowLoginModal(true)
        }
    }
    return (
        <div id="page-layout-checkout" onLoad={loggedIn}>
            {loading && <SpinnerLoader/>}
            <div id={"checkout-content"}>
                <div className={"checkout-split left"}>
                    <div id="checkout-left-side">

                        <section id="checkout-left">

                            <h2 id="checkout"> Checkout</h2>

                            <form id="billing-input" onSubmit={handlePurchase}>


                                <div className={"checkout-fill-out-form"}>
                                    <div className={"checkout-input-section"} id={"checkout-fullname"}>
                                        <label htmlFor="fullname">Full Name *</label>
                                        <input required={required}
                                               className="input-field"
                                               placeholder="Enter full name"
                                               type="text"
                                               id="fullname"
                                               name="fullname"/>
                                    </div>

                                    <div className={"checkout-input-section"} id={"checkout-credit-card"}>
                                        <label htmlFor="credit-card">Credit card number *</label>
                                        <input required={required}
                                               className="input-field"
                                               placeholder="Credit card number"
                                               type="text"
                                               name="Credit-card"
                                               value={cardNumber}
                                               ref={inputRef}
                                               maxLength={19}
                                               onInput={handleCardNr}
                                               id="credit-card"/>
                                    </div>


                                    <div className="two-inputs">

                                        <div className={"checkout-input-section"} id={"checkout-exp-date"}>
                                            <label htmlFor="exp-date">Expiration date *</label>
                                            <input required={required}
                                                   className="input-field"
                                                   placeholder="Expiration date mm/yy"
                                                   type="text"
                                                   name="expiration date"
                                                   maxLength={5}
                                                   ref={inputRef}
                                                   onInput={handleExpiration}
                                                   id="exp-date"/>
                                        </div>

                                        <div className={"checkout-input-section"} id={"checkout-cvc"}>
                                            <label htmlFor="sec-code">Security code *</label>
                                            <input required={true}
                                                   className="input-field"
                                                   placeholder="Security code"
                                                   type="text"
                                                   name="expiration date"
                                                   onInput={handleCVC}
                                                   maxLength={3}
                                                   id="sec-code"/>
                                        </div>
                                    </div>

                                    <div className={"checkout-input-section"} id={"checkout-country"}>
                                        <label htmlFor="country-select">Country * </label>
                                        <Select className={"country-select"}
                                                required={required}
                                                options={options}
                                                value={options.find(option => option.value === countrySelect)}
                                                onChange={(selected) => setCountrySelect(selected)}
                                                unstyled={true}
                                                classNamePrefix={"country-select"}/>
                                    </div>
                                </div>

                                <div className="purchase-terms">
                                    <input type="checkbox" id="terms-and-conditions" required={required}/>
                                    <label htmlFor="terms-and-conditions">
                                        <p> I accept the terms and conditions </p>
                                    </label>
                                </div>

                                <div id="purchase">
                                    <button type="submit" className={"cta-button"} id={"checkout-purchase-button"} disabled={loading}>
                                        {loading ? <p> Processing </p> : <p> Pay Now</p>}
                                    </button>
                                </div>

                            </form>


                        </section>
                    </div>
                </div>

                <div className={"checkout-split right"}>
                    <div id="checkout-right-side">
                        <section id="checkout-right">

                            <h2 className="checkout-headers">Your Cart</h2>

                            <div className="checkout-right-content">
                                <div className="checkout-product-display">

                                    <img className="product-checkout-image" src={courseData.course.imgLink}
                                         alt="product image"/>

                                    <div className="checkout-product-display-text">
                                        <h3 className="checkout-course-headers">{courseData.course.title}</h3>
                                        <p className="product-desc">{courseData.course.description} </p>
                                    </div>

                                </div>

                                <div className="product-price-overview">

                                    <div className="product-price-overview-line" id="product-pricetag">
                                        <p className="product-price-title-grey">Subtotal</p>
                                        <p className="product-price"> {courseData.price},- NOK</p>
                                    </div>

                                    <div className="product-price-overview-line" id="purchase-discount">
                                        <p className="product-price-title-grey">Discount</p>
                                        <p className="product-price">
                                            {(courseData.discount * 100).toFixed(0)}%</p>
                                    </div>
                                    &nbsp;
                                    <div className="product-price-overview-line" id="purchase-total-cost">
                                        <p className="product-price-title">Total</p>
                                        <p className="product-price">
                                            {(courseData.price * (1 - courseData.discount)).toFixed(2)},-
                                            NOK</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
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
        </div>
    )

}