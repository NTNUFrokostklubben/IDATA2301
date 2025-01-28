import CourseCard from "../component/coursecard";

export default function Index() {
    return (
        <div className={"App"}>
            <section id={"hero"} className={"Hero"}>
                <div>
                    <p>
                        Learniverse offers courses that give you the complete competence you need to succeed in the
                        workplace and beyond
                    </p>
                    <button className={"CTAbutton"}>
                        Try for free
                    </button>
                </div>
            </section>
            <section id={"courseinfo"} className={"CourseInfo"} >
                <h1>
                    Lorem ipsum dolor sit amet
                </h1>
                <p>
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className={"grid grid--4"}>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>

            </section>
        </div>


    )
} 