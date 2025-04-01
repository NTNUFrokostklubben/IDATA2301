import "./about.css"
export default function About (){

    return(
        <div>
            <body>
            <section id="heroWorker">
                <div className="container">
                    <picture id="worker-hero">
                        <source srcSet="/images/businessWoman.png" type="image/png"/>
                        <img width="286" height="419" src="/images/businessWoman.png"
                             alt="a worker working on a computer"/>
                    </picture>
                    <p className="herotext">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                        ex ea
                        commodo
                        consequat."</p>
                </div>
            </section>


            <section id="blurb">
                <h1 className="blurbTitle">what is learniverse?</h1>
                <p className="blurbText">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque
                    laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt
                    explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur
                    magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                    quia dolor
                    sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                </p>
            </section>
            <section id="reviews">
                <h2 id="reviewTitle">what our students say</h2>
                <div className="review">

                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe
                        </p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                </div>
            </section>
            <section id="contacts">
                <h2 id="contactTitle"> Contact us</h2>
                <picture>
                    <img id="gm-picture" src="https://picsum.photos/400/400" alt="contact us"/>
                    <h5>
                        General Manager
                    </h5>
                    <p> Tore Toresen</p>
                    <p> tlf: 32312421</p>
                    <p> epost: Toret@learniverse.no</p>
                </picture>
            </section>
            </body>
        </div>
    )
}