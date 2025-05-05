import {useState} from "react";
import "./spinnerLoader.css"
export default function SpinnerLoader(show= true){
    const [showSpinner, setShowSpinner] = useState (show);
    return(
        <div className="spinner-loader-background">
            {
                showSpinner ? (
                    <img src="/images/loading-spinner.svg" alt="spinner"/>
                ) : (<p>Something went wrong</p>)
            }
        </div>
    )
}