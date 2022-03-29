import { useState } from "react";
import { supabase } from "../utils/initSupa";

export default function SupaAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (type, email, password) => {
    const { error, user } =
      type === "LOGIN"
        ? await supabase.auth.signIn(email, password)
        : await supabase.auth.signUp(email, password);
    if (!error && !user) alert("Check your email for the login");
    if (error) alert(error.message);
  };

  async function handleOauthLogin(provider) {
    let { error } = await supabase.auth.signIn({ provider });
    if (error) alert(error.message);
  }

  async function forgotPassword() {
    const email = prompt("Enter your email");
    if (email === null || email === "") return alert("Email is required");

    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) return alert(error.message);
    alert("Check your email for the reset password link");
  }

  return (
    <div>
      <div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            handleSubmit("SIGNUP", email, password);
          }}
        >
          Sign up
        </button>
        <button
          onClick={() => {
            handleSubmit("LOGIN", email, password);
          }}
        >
          {password.length ? "Sign in" : "Send magic link"}
        </button>
      </div>
      <div>
        <button onClick={forgotPassword}>Forgot your password?</button>
      </div>
      <div>
        <hr />
        <span>Or continue with</span>

        <div>
          <div>
            <button onClick={() => handleOauthLogin("github")} type="button">
              GitHub
            </button>
          </div>
          <div>
            <button onClick={() => handleOauthLogin("google")} type="button">
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
