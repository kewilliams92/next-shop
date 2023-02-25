import Page from "../components/Page";
import Input from "../components/Input";
import Field from "../components/Field";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { fetchJson } from "../lib/api";

const SignInPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState({ loading: false, error: false })

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        setStatus({ loading: true, error: false });
        try{
        const response = await fetchJson("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        setStatus({ loading: false, error: false });
        console.log("response from handleSubmit",response);
        router.push("/");
        } catch (err) {
            setStatus({ loading: false, error: true });
        }
    }

    return (
        <Page title="Sign In">
            <form onSubmit={handleSubmit}>
                <Field label="Email">
                    <Input type="email" required value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Field>
                <Field label="Password">
                    <Input type="password" required value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                {status.error && (
                    <p className="text-red-500 text-sm">
                        Invalid creditentials
                    </p>
                )}
                {status.loading ? (
                    <p className="text-gray-500 text-sm">
                        Loading...
                        </p>
                        ) : (
                <Button type="submit">
                    Sign In
                </Button>
                )}
            </form>
        </Page>
    );
};

export default SignInPage;