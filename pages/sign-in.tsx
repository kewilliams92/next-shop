import Page from "../components/Page";
import Input from "../components/Input";
import Field from "../components/Field";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { useSignIn } from "../hooks/user";

const SignInPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, signInError, signInLoading} = useSignIn();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        try{
            const valid = await signIn(email, password);
            if(valid){
            router.push('/');
            }
        } catch (err) {
            //mutation.isError will be true
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
                {signInError && (
                    <p className="text-red-500 text-sm">
                        Invalid creditentials
                    </p>
                )}
                {signInLoading ? (
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