import {oauthSignIn} from "../../../utils/authentication/authentication";
import "./googleAuthButton.css"

export default function GoogleAuthButton() {

    return (
        <button
            onClick={oauthSignIn}
            className="google-login-btn cta-button secondary-button">
            <img
                src={"https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"}
                alt={"Google logo"}/>
            Sign in with Google
        </button>
    )
}