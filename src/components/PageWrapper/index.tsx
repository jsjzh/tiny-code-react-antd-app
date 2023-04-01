import { Spin } from "antd";
import React from "react";

type IPageWrapperProps = {
  loading?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const PageWrapper: React.FC<IPageWrapperProps> = (props) => (
  <Spin spinning={!!props.loading} size="large">
    <div style={props.style}>{props.children}</div>
  </Spin>
);

export default PageWrapper;
