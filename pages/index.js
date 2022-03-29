import PropTypes from "prop-types";
import useSWR from "swr";
import { useUser } from "../utils/useUser";
import SupaAuth from "../components/SupaAuth";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      token,
    }),
    credentials: "same-origin",
  }).then((res) => res.json());

fetcher.propType = {
  token: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const Index = () => {
  const { user, session } = useUser();
  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );

  if (!user) {
    return (
      <>
        <p>Sorry looks like</p>
        <p>Your not signed in.</p>
        <div>
          <SupaAuth />
        </div>
      </>
    );
  }

  return (
    <div>
      <p
        style={{
          display: "inline-block",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => supabase.auth.signOut()}
      >
        Log out
      </p>
      <div>
        <p>You are signed in. Email: {user.email}</p>
      </div>
      {error && <div>Failed to fetch user!</div>}
      {data && !error ? (
        <div>
          <span>User data retrieved server-side (in API route):</span>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default Index;
