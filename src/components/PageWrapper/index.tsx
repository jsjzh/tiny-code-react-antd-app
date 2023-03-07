import React from "react";
import Loading from "../Loading";

type IPageWrapperProps = {
  loading?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const PageWrapper: React.FC<IPageWrapperProps> = (props) => {
  return props.loading ? (
    <Loading />
  ) : (
    <div style={props.style}>{props.children}</div>
  );
};

export default PageWrapper;
