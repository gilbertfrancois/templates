import React from "react";
import config from "./config";

export default function App() {
    const [backEndStatus, setBackEndStatus] = React.useState("offline");

    const fetchBackEndStatus = async () => {
        try {
            console.log(config.API_URL);
            const response = await fetch(config.API_URL + "/api/status");
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
