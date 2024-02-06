import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { type TRecentlyViewPage } from './types.ts';

interface Props {
  children: ReactNode
}

interface RecentlyViewedContextType {
  getRecentlyViewed: () => TRecentlyViewPage[]
  addRecentlyViewed: (_page: TRecentlyViewPage) => void
  children?: ReactNode
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider = (props: Props) => {
  const [recentlyViewed, setRecentlyViewed] = useState<TRecentlyViewPage[]>([]);

  useEffect(() => {
    // TODO Fetch recently viewed pages from API
  }, []);

  const getRecentlyViewed = (): TRecentlyViewPage[] => {
    return recentlyViewed;
  };

  const addRecentlyViewed = (page: TRecentlyViewPage): void => {
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
