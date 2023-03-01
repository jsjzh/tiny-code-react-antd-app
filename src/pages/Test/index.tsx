import React, { useCallback } from "react";

import PageWrapper from "@/components/PageWrapper";
import useTestStore from "@/store/test";

interface IProps {}

const Test: React.FC<IProps> = (props) => {
  const testStore = useTestStore();

  const bears = useTestStore(useCallback((state) => state.bears, []));

  return (
    <PageWrapper>
      <div>
        <div>{bears}</div>
        <div>{testStore.bears}</div>
        <div>
          <button onClick={() => testStore.increase(1)}>+1</button>
          <button onClick={() => testStore.increase(-1)}>-1</button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Test;
