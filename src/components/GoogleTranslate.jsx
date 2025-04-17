import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (!window.google || !window.google.translate) {
      if (!window.googleTranslateScriptLoaded) {
        // Load the Google Translate script dynamically
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateScriptLoaded = true;

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
        };
      }
    } else {
      window.googleTranslateElementInit();
    }

    return () => {
    };
  }, []);

  return (
    <div className="max-h-24 top-0 right-40 bg-white p-2 rounded-lg shadow-lg">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
