export default function CourseCard() {
    return (
        <article className={"coursecard"}>
            <a href={"#"}>
                <img className={"cardImage"} src={"logo192.png"}
                     alt={"logo"}
                     width={"100px"}
                     height={"100px"}/>
                <section className={"cardContent"}>
                    <h2 className={"cardTitle"}>Sed ut perspiciatis unde omnis iste natus
                        error sit voluptatem accusantium</h2>
                    <p className={"cardDesc"}>qui dolorem ipsum quia dolor</p>
                    <p className={"cardPrice"}><b>14 000 NOK</b></p>
                </section>
            </a>
        </article>

    )
}