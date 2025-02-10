const loadPayHereScript = () => {
    return new Promise((resolve, reject) => {
        if (document.getElementById("payhere-sdk")) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://www.payhere.lk/lib/payhere.js";
        script.id = "payhere-sdk";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

export default loadPayHereScript;