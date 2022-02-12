import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddSpacecraft from "./pages/AddSpacecraft";
import AddAstronaut from "./pages/AddAstronaut";
import EditSpacecraft from "./pages/EditSpacecraft";
import EditAstronaut from "./pages/EditAstronaut";
import Home from "./pages/Home";
import AstronautPage from "./pages/AstronautPage";
import { get } from "./utils/useAxios";

function App() {
  const [spacecraftList, setSpacecraftList] = useState([]);
  const [astronautList, setAstronautList] = useState([]);

  useEffect(() => {
    const fetchSpacecraftList = async () => {
      try {
        const response = await get("/spacecraft/");
        
        if (response.status === 200) {
          
          setSpacecraftList(response.data.spacecraft);
        }
      } catch (error) {}
    };
    const fetchAstronautList = async () => {
      try {
        const response = await get("/astronaut/");
        if (response.status === 200) {
          setAstronautList(response.data.astronauts);
        }
      } catch (error) {}
    };

    fetchAstronautList();
    fetchSpacecraftList();
  }, []);

  return (
    <Box padding="1em">
      <Router> 
        <Flex justifyContent={"flex-start"}>
          <Box marginRight={"1em"}>
            <Link to="/">Home</Link>
          </Box>
          <Box marginRight={"1em"}>
            <Link to="/astronauts">Astronauts</Link>
          </Box>
        </Flex>

        <Routes>
          <Route
            path="/astronaut/add/"
            element={<AddAstronaut spacecraftList={spacecraftList} setAstronautList={setAstronautList} />}
          />
          <Route
            path="/astronaut/edit/:id"
            element={<EditAstronaut spacecraftList={spacecraftList} setAstronautList={setAstronautList} astronautList={astronautList}/>}
          />
          <Route
            path="/spacecraft/add/"
            element={<AddSpacecraft setSpacecraftList={setSpacecraftList} />}
          />
          <Route
            path="/spacecraft/edit/:id"
            element={
              <EditSpacecraft
                spacecraftList={spacecraftList}
                setSpacecraftList={setSpacecraftList}
                canEdit={false}
              />
            }
          />
          <Route
            path="/astronauts"
            element={
              <AstronautPage astronautList={astronautList} setAstronautList={setAstronautList} canEdit={true} />
            }
          />
          <Route
            path="/"
            element={
              <Home spacecraftList={spacecraftList} setSpacecraftList={setSpacecraftList} />
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
