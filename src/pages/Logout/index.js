import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";
import ToastContext from "../../Contexts/ToastContext";

function Logout() {
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") && localStorage.getItem("user")) {
      setLoggedIn(false);
      setUser(null);

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      addToast("You have been logged out, goodbye!", "toast-success");
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return;
}

export default Logout;

{
  /* <div className="logout">
<h1>Bye!</h1>
<h2>Logout successful</h2>
<p>Thanks for stopping by, come back soon!</p>
<Button btn="success">
  <Link className="logout-home-link" to="/">
    Go back to homepage
  </Link>
</Button>
</div> */
}
