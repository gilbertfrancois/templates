import React from "react";
import config from "./config";

export default function App() {
    const [backEndStatus, setBackEndStatus] = React.useState("offline");

    const fetchBackEndStatus = async () => {
        try {
            const response = await fetch(config.API_URL + "/api/status", { mode: "cors" });
            const data = await response.json();
            if (data.success) {
                setBackEndStatus(data.data.status);
            }
            console.log({ data });
        } catch (e) {
            setBackEndStatus("error");
            console.log(e);
        }
    };

    React.useEffect(() => {
        fetchBackEndStatus();
        // Destructor function
        return () => {};
    }, []);

    return <div className="container">Backend status: {backEndStatus}</div>;
}
