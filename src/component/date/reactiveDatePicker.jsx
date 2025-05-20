import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

export default function ReactiveDatePicker({setStartDate, startDate, mobileWidth, id, name}) {


    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= mobileWidth) {
                setMobileView(true);
            } else {
                setMobileView(false);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function convertTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        mobileView ? <input value={convertTimestamp(new Date(startDate).getTime())} type={"date"} onChange={(date) => setStartDate(date.target.value)}/>
                :
                <DatePicker id={id} name={name} onChange={(date) => setStartDate(date)}
                            selected={new Date(startDate).getTime()} dateFormat={"dd-MM-YYYY"} locale={"nb"}
                            icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/>

    )
}