import "./auth.css"

export default function Login() {



    return (
        <div className="authform">
            <h1>
                Log In
            </h1>
            <form action="http://localhost:8080/login" method="POST">
                <section id="credentials">

                    <label htmlFor="email">Email:
                        <input type="text" id="email" name="email" required/>
                    </label>


                    <label htmlFor="password">Password:
                        <input type="password" id="password" name="password" required/>
                    </label>


                </section>
                <section id="CTA">
                    <button className="cta-button" type="submit">Log In</button>
                    {/*TODO: Implement redirect to Signup modal (probably just build component again in react)*/}
                    <button className="cta-button secondary-button" type="submit">Sign up instead</button>
                </section>
            </form>
        </div>
    )
}