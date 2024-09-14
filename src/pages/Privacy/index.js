import Block from "../../components/Block";
import "./styles.css";

const Privacy = () => {
  return (
    <Block blk="block-embossed">
      <h1 style={{ textAlign: "center" }}>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This privacy policy explains how we
        collect, use, and protect your personal information when you use the
        Bookstore app.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address,
        and any other data you provide while using the app. We also collect
        non-personal information related to your usage of the app, such as your
        IP address, browser type, and activity within the app.
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        The information collected is used to improve the functionality of the
        app, provide personalized services, and respond to your inquiries. We do
        not share your personal information with third parties without your
        consent, unless required by law.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement appropriate security measures to protect your data from
        unauthorized access or disclosure. However, please note that no method
        of data transmission over the internet is completely secure.
      </p>

      <h2>Changes to this Policy</h2>
      <p>
        We reserve the right to update this privacy policy at any time. Any
        changes will be posted on this page, and we encourage you to review it
        periodically.
      </p>

      <p>
        If you have any questions about our privacy practices, please contact us
        at <a href="mailto:ruitx@example.com">ruitx@example.com</a>.
      </p>
    </Block>
  );
};

export default Privacy;
