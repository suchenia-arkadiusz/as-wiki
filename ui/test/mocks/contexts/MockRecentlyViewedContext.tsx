import { RecentlyViewedContext } from "../../../src/contexts/RecentlyViewedContext.tsx";

const MockRecentlyViewedContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecentlyViewedContext.Provider
      value={{
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
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export default MockRecentlyViewedContext;
