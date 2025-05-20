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


        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        mobileView ? <input type={"date"} onChange={(date) => setStartDate(date.target.value)}/>
                :
                <DatePicker id={id} name={name} onChange={(date) => setStartDate(date)}
                            selected={new Date(startDate)} dateFormat={"dd-MM-YYYY"} locale={"nb"}
                            icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/>

    )
}