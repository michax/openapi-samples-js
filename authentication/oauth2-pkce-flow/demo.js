/*jslint this: true, browser: true, for: true, long: true */
/*global window console run */

let codeVerifier = "";
let codeChallenge;

/**
 * This can be used to validate your redirect configuration.
 * @return {void}
 */
function testRedirectUrl() {
    const redirectUrl = document.getElementById("idEdtRedirectUrl").value;
    fetch(
        redirectUrl, {
            "method": "GET",
            "mode": "no-cors",
            "cache": "reload"
        }
    ).then(function (response) {
        console.log("Nice! The redirect page " + redirectUrl + " is available.");
    }).catch(function (error) {
        console.error(error);
    });
}

/**
 * Generate a verifier.
 * @return {void}
 */
function generateCodeVerifier() {

    function base64URLEncode(str) {
        return str.toString(CryptoJS.enc.Base64).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }

    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let i;
    for (i = 0; i < 32; i += 1) {
        codeVerifier += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    codeVerifier = base64URLEncode(codeVerifier);
    codeChallenge = base64URLEncode(CryptoJS.SHA256(codeVerifier));
    console.log("Verifier: " + codeVerifier + "\r\nChallenge: " + codeChallenge);
}

/**
 * If login failed, the error can be found as a query parameter.
 * @return {void}
 */
function generateLink() {
    // State contains a unique number, which must be stored in the client and compared with the incoming state after authentication
    // It is passed as base64 encoded string
    // https://auth0.com/docs/protocols/oauth2/oauth-state
    const stateString = window.btoa(JSON.stringify({
            // Token is a random number - other data can be added as well
            "csrfToken": Math.random(),
            "state": document.getElementById("idEdtState").value
    }));
    let url = "https://sim.logonvalidation.net/authorize" +
        "?client_id=" + document.getElementById("idEdtAppKey").value +
        "&response_type=code" +
        "&code_challenge=" + codeChallenge +
        "&code_challenge_method=S256" +
        "&state=" + stateString +
        "&redirect_uri=" + encodeURIComponent(document.getElementById("idEdtRedirectUrl").value);
    if (document.getElementById("idCbxCulture").value !== "-") {
        url += "&lang=" + encodeURIComponent(document.getElementById("idCbxCulture").value);
    }
    document.getElementById("idResponse").innerHTML = '<h2>Follow this link to continue with step 2:</h2><a href="' + url + '" target="_blank">' + url + "</a><br /><br />Remember the verifier: " + codeVerifier;
}

(function () {
    document.getElementById("idBtnTestRedirectUrl").addEventListener("click", function () {
        run(testRedirectUrl);
    });
    document.getElementById("idBtnGenerateCodeVerifier").addEventListener("click", function () {
        run(generateCodeVerifier);
    });
    document.getElementById("idBtnGenerateLink").addEventListener("click", function () {
        run(generateLink);
    });
}());
