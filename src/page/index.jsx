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
                    <CourseCard name={"AWS"} path={"courses/AWS.png"}/>
                    <CourseCard name={"Machine Learning"} path={"courses/machine_learning.jpg"}/>
                    <CourseCard name={"Azure"} path={"courses/azure.png"}/>
                    <CourseCard name={"Databricks"} path={"courses/Databricks_Logo.png"}/>
                    <CourseCard name={"dotnet"} path={"courses/dotnet.jpg"}/>
                    <CourseCard name={"SQL"} path={"courses/SQL.jpg"}/>
                    <CourseCard name={"Java"} path={"courses/Java.png"}/>
                    <CourseCard name={"Image Recognition"} path={"courses/ImageRecognition.jpg"}/>
                    <CourseCard name={"SEO"} path={"courses/SEO.png"}/>
                    
                </div>

            </section>
        </div>


    )
} 