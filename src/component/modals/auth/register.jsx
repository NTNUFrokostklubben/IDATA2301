import "./auth.css"

export default function Register() {

    return (
        <div className="authform">
            <h1>
                Sign Up
            </h1>
            <form action="http://localhost:8080/login" method="POST">
                <section id="credentials">

                    <label htmlFor="name">Full name:
                        <input type="text" id="name" name="name" required/>
                    </label>


                    <label htmlFor="email">Email:
                        <input type="text" id="email" name="email" required/>
                    </label>


                    <label htmlFor="password">Password:
                        <input type="password" id="password" name="password" required/>
                    </label>


                </section>
                <section id="CTA">
                    <button className="cta-button" type="submit">Sign up</button>
                    {/*TODO: Implement redirect to Signup modal (probably just build component again in react)*/}
                    <button className="cta-button secondary-button" type="submit">Log In instead</button>
                </section>
            </form>
        </div>
    )
}