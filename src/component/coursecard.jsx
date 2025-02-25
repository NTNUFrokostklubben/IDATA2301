export default function CourseCard(props) {
    
    class image {
        constructor(name, path) {
            this.name = name;
            this.path = path;
        }
    }
    
    const cardImg =  new image(props.name, props.path)
    
    return (
        <article className={"coursecard"}>
            <a href={"#"}>
                <img className={"cardImage"} src={cardImg.path}
                     alt={cardImg.name}
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