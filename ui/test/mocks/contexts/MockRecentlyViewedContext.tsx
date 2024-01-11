import { RecentlyViewedContext } from "../../../src/contexts/RecentlyViewedContext.tsx";
import { useMemo } from "react";

const MockRecentlyViewedContext = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useMemo(
    () => ({
      getRecentlyViewed: () => [
        {
          id: "1",
          name: "Page 1",
          updatedAt: new Date(),
          updatedBy: "Test User",
          username: "test",
        },
        {
          id: "2",
          name: "Page 2",
          updatedAt: new Date(),
          updatedBy: "Test User 2",
          username: "test2",
        },
        {
          id: "3",
          name: "Page 3",
          updatedAt: new Date(),
          updatedBy: "Test User",
          username: "test",
        },
        {
          id: "4",
          name: "Page 4",
          updatedAt: new Date(),
          updatedBy: "Test User 2",
          username: "test2",
        },
      ],
      addRecentlyViewed: () => {},
    }),
    [],
  );

  return <RecentlyViewedContext.Provider value={contextValue}>{children}</RecentlyViewedContext.Provider>;
};

export default MockRecentlyViewedContext;
