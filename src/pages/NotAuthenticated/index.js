import { Link, useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import "./styles.css";

function NotAuthenticated() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Block>
      <div className="not-authenticated">
        <h1>401</h1>
        <h2>Unauthorized</h2>
        <p>Oops! It seems you don't have permission to access this page.</p>
        <p>
          Login to continue. If the problem persists, please contact the site
          admin.
        </p>
        <Button btn="success">
          <Link className="not-authenticated-home-link" to="/">
            Go back to homepage
          </Link>
        </Button>

        <Button onClick={goBack}>Go Back</Button>
      </div>
    </Block>
  );
}

export default NotAuthenticated;
