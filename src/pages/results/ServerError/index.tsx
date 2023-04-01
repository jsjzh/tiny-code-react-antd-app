import React from "react";
import { Result } from "antd";

const ServerError: React.FC = () => (
  <Result status="500" title="500" subTitle="Sorry, something went wrong." />
);

export default ServerError;
