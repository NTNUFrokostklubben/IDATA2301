

export default function Index() {
    return (
        <div >
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
                <h1>Temporary links to pages</h1>
                <ul>
                    <li><a href={"/search"}>search/filters</a></li>
                    <li><a href={"/admin"}>Admin</a></li>
                </ul>


            </section>
        </div>


    )
} 