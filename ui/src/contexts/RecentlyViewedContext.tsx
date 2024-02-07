import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { type RecentlyViewPage } from './types.ts';

type Props = {
  children: ReactNode;
};

type RecentlyViewedContextType = {
  getRecentlyViewed: () => RecentlyViewPage[];
  addRecentlyViewed: (_page: RecentlyViewPage) => void;
  children?: ReactNode;
};

export const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider = (props: Props) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewPage[]>([]);

  useEffect(() => {
    // TODO Fetch recently viewed pages from API
  }, []);

  const getRecentlyViewed = (): RecentlyViewPage[] => {
    return recentlyViewed;
  };

  const addRecentlyViewed = (page: RecentlyViewPage): void => {
    const pages = [page];
    pages.push(...recentlyViewed);
    setRecentlyViewed(pages.slice(0, 10));
  };

  const contextValue = useMemo(() => ({ getRecentlyViewed, addRecentlyViewed }), []);

  return <RecentlyViewedContext.Provider value={contextValue}>{props.children}</RecentlyViewedContext.Provider>;
};

export const useRecentlyViewedContext = () => {
  const context = useContext(RecentlyViewedContext);

  if (context === undefined) {
    throw new Error('useRecentlyViewedContext must be used within a RecentlyViewedProvider');
  }

  return context;
};
