import Topbar from "./component/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { Box } from "@mui/material";

function App() {
    return (
        <div className="App">
            <Topbar />
            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Home />
            </Box>
        </div>
    );
}

export default App;
