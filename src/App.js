import "./App.css";
import React from "react";
import { Button, MenuItem, Select, TextField } from "@material-ui/core";

function App() {
  const [inputUrl, setInputUrl] = React.useState("");
  const [httpType, setHttpType] = React.useState("GET");
  const [response, setResponse] = React.useState({});
  const [postBody, setPostBody] = React.useState({});

  const marginStyles = {
    margin: "5px",
  };

  const btnHandler = async () => {
    const fetchParams = {
      method: httpType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: httpType === "POST" ? JSON.stringify(postBody) : null,
    };

    const urlResp = await fetch(inputUrl, fetchParams).then((resp) =>
      resp.json()
    );

    console.log("urlResp", urlResp);
    setResponse(urlResp);
  };

  return (
    <div className="App">
      <div className="App-header">
        <TextField
          value={inputUrl}
          style={marginStyles}
          onChange={(evt) => setInputUrl(evt.target.value)}
          label="Input URL"
          variant="outlined"
        />

        <Select
          value={httpType}
          style={marginStyles}
          label="Http Method"
          onChange={(evt) => setHttpType(evt.target.value)}
        >
          <MenuItem value={"GET"}>Get</MenuItem>
          <MenuItem value={"POST"}>Post</MenuItem>
        </Select>

        {httpType === "POST" && (
          <TextField
            value={postBody}
            style={marginStyles}
            onChange={(evt) => setPostBody(evt.target.value)}
            label="Body"
            variant="outlined"
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={btnHandler}
          style={marginStyles}
        >
          Submit
        </Button>

        <pre style={marginStyles}>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
