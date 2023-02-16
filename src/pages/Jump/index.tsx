import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Jump: React.FC = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  console.log(params);
  console.log(searchParams.get("author"));
  console.log(searchParams.get("age"));

  return <>Jump</>;
};
export default Jump;
