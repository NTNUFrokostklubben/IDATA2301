import {useState} from "react";
import "./collapsable.css"

export default function Collapsable({title, defaultOpen = false, children}) {

    const [isOpen, setIsOpen] = useState(defaultOpen)


    function toggleOpen() {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button onClick={toggleOpen} className="filter-header" type={"button"}>
                <p>{title}</p>
                <img style={{
                    transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform 0.2s ease'
                }}
                     width="12" src="/icons/triangle-sharp.svg" alt=""/>
            </button>
            <div className={"collapsable" + (isOpen ? " collapsed" : "")}>
                {children}
            </div>
        </>
    )
}