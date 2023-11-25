import { createContext, ReactNode, useEffect, useState } from "react";
import { TRecentlyViewPage } from "./types.ts";

type RecentlyViewedContextProps = {
  children: ReactNode;
};

type TRecentlyViewedContext = {
  getRecentlyViewed: () => Array<TRecentlyViewPage>;
  addRecentlyViewed: (page: TRecentlyViewPage) => void;
  children?: ReactNode;
};

export const RecentlyViewedController = (props: RecentlyViewedContextProps) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Array<TRecentlyViewPage>>([]);

  useEffect(() => {
    setRecentlyViewed(mockedRecentlyViewed);
  }, []);

  const getRecentlyViewed = (): Array<TRecentlyViewPage> => {
    return recentlyViewed;
  };

  const addRecentlyViewed = (page: TRecentlyViewPage): void => {
    const pages = [page];
    pages.push(...recentlyViewed);
    setRecentlyViewed(pages.slice(0, 10));
  };

  return <RecentlyViewedContext.Provider value={{ getRecentlyViewed, addRecentlyViewed }}>{props.children}</RecentlyViewedContext.Provider>;
};

export const RecentlyViewedContext = createContext<TRecentlyViewedContext | undefined>(undefined);

const mockedRecentlyViewed: Array<TRecentlyViewPage> = [
  {
    id: "1",
    name: "Page 1",
    updatedAt: new Date(),
    updatedBy: "Arkadiusz Suchenia",
    username: "aru",
  },
  {
    id: "2",
    name: "Page 2",
    updatedAt: new Date(),
    updatedBy: "Zosia Wu",
    username: "zosia",
  },
  {
    id: "3",
    name: "Page 3",
    updatedAt: new Date(),
    updatedBy: "Arkadiusz Suchenia",
    username: "aru",
  },
  {
    id: "4",
    name: "Page 4",
    updatedAt: new Date(),
    updatedBy: "Zosia Wu",
    username: "zosia",
  },
];
