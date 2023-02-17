import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/router";

const App: React.FC = (props) => useRoutes(routes);

export default App;
