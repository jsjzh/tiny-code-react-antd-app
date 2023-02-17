import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Jump: React.FC = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  searchParams.forEach((value, key) => {
    console.log(`key: ${key}`, `value: ${value}`);
  });

  return <>Jump</>;
};
export default Jump;
