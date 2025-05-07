import "./checkout.css"
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {UserContext} from "../userContext";
import {createPortal} from "react-dom";
import Login from "../component/modals/auth/login";
import Register from "../component/modals/auth/register";
import {useSelector} from "react-redux";
import Select from 'react-select'
import countryList from "react-select-country-list";
import {AsyncApiRequest} from "../utils/requests";
import SpinnerLoader from "../component/modals/Spinner/spinnerLoader";
import {getAuthenticatedUser} from "../utils/authentication/authentication";


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

    const handlePurchase = async () =>{
        console.log(courseData)
        setLoading(true)
        const status = await AsyncApiRequest("POST", `/transaction/offerId/${courseData.id}/userid/${userData.id}`, null);
        try {
            if (status.status === 201){
                const addUserCourse =
                    AsyncApiRequest("POST" ,`/userCourses/add/${userData.id}/${courseData.course.id}`, null)
                    .then( response  => response.json());
            }

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

    const handleCardNr = (e) => {
        const input = e.target.value;

        // 1. Remove all non-digit characters
        const digitsOnly = input.replace(/\D/g, '');


        // 3. Add space after every 4 digits
        const formatted = digitsOnly.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')

        setCardNumber(formatted);
    }
    const openPopup = (url) => {
        const width = 700;
        const height = 500;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
            url, // URL
            "_blank", // Target
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    };
    const openPaypal = () => openPopup("https://www.paypal.com/no/webapps/mpp/paypal-popup")
    const openKlarna = () => openPopup("https://docs.klarna.com/")

    function loggedIn(){
        let user = getAuthenticatedUser();
        if(user == null){
                setShowLoginModal(true)
        }
    }
    return (
        <article id="page-layout-checkout" onLoad={loggedIn}>
            {loading && <SpinnerLoader/>}
            <div id="checkout-left-side">
                <section id="express-checkout">
                    <h4 className="checkout-headers">Express checkout</h4>
                    <div id="payment-options">
                        <div id="paypal">
                            <a onClick={openPaypal}
                                title="Slik fungerer PayPal"
                                rel="noopener noreferrer">
                                <img id="paypal-image"
                                     src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png"
                                     border="0"
                                     alt="PayPal Logo"
                                /></a>
                        </div>
                        <div id="klarna">
                            <a onClick={openKlarna}  rel="noopener noreferrer" >
                                <img id="klarna-image" src="/images/klarnaXL.webp" alt="klarna"/></a>
                        </div>
                        <div id="other">
                            <button onClick="">Other</button>
                        </div>
                    </div>
                </section>

                <div className="separator">Continue below to pay with credit card</div>
                <section id="billing">
                    <h5 className="checkout-headers"> Additional Contact Information</h5>
                    <p id="leave-empty-text">Leave empty if no other recipients</p>
                    <label htmlFor="checkout-email"></label>
                    <input className="large-input-field"
                           type="text"

                           id="checkout-email"
                           name="email input"
                           pattern={"\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b"}
                           placeholder="Email"/>
                    <h5 className="checkout-headers"> Billing</h5>
                    <form id="billing-input" onSubmit={e => e.preventDefault() }>
                        <Select id={"country-select"}

                                required={false}
                               // styles={customSelectStyles}
                                options={options}
                                value={countrySelect}
                                unstyled={true}
                                classNamePrefix={"country-select"}/>
                        <div className="small-input">
                            <input required={false}
                                   className="small-input-field"
                                   placeholder="First name"
                                   type="text"
                                   id="firstname"
                                   name="username"/>
                            <input required={false}
                                   className="small-input-field"
                                   type="text"
                                   placeholder="Last name"
                                   id="lastname"
                                   name="lastname"/>
                        </div>
                        <input required={false}
                               className="large-input-field"
                               placeholder="Credit card number"
                               type="text"
                               name="Credit-card"
                               value={cardNumber}
                               ref={inputRef}
                               maxLength={19}
                               onInput={handleCardNr}
                               id="credit-card"/>
                        <div className="small-input">
                            <input required={false}
                                   className="small-input-field"
                                   placeholder="Expiration date mm/yy"
                                   type="text"
                                   name="expiration date"
                                   maxLength={5}
                                   ref={inputRef}
                                   onInput={handleExpiration}
                                   id="exp-date"/>
                            <input required={false}
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
                            <button type="submit" id="purchase-button" onClick={handlePurchase} disabled={loading}>
                                {loading ? 'Processing' : 'purchase'}
                            </button>
                        </div>
                    </form>


                </section>
            </div>
            <div id="checkout-right-side">
                <section id="checkout">
                    <h5 className="checkout-headers">Product</h5>
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