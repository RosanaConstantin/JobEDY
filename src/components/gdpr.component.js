import React from "react";
import "../css/Popup.css";
// Basic
// import CookieConsent from "react-cookie-consent";

// Option
import CookieConsent, { Cookies } from "react-cookie-consent";

const Popup = () => {
    return (
        <div className="popup">
            {/* Basic */}
            {/* <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent> */}

            {/* option */}
            <CookieConsent
                disableStyles
                location="none"
                buttonText="Akzeptieren"
                cookieName="myAwesomeCookieName2"
                overlay
                overlayClasses="overlayclass"
            // style={{ background: "#2B373B" }}
            // buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            // expires={150}
            >
                We use cookies and tracking technologies on our website. These
                serve to optimize our website, the further development of
                Services and Marketing Purposes. The use of certain cookies is for
                unrestricted use of our website is technically necessary.
                By clicking on "Accept" you agree that cookies are also accepted
                Analysis, marketing and social media purposes are used. the
                You can withdraw your consent at any time. additional Information
                as well as the possibility of objection can be found in our
                Data protection information.<button>Accept</button>
            </CookieConsent>
        </div>
    );
};

export default Popup;
