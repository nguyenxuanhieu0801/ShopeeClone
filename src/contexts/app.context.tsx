import { createContext, useContext, useState } from 'react';
import { ExtendedPurchase, User } from '~/types';
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils';

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchases: ExtendedPurchase[];
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>;
  reset: () => void;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
});

const initialAppContext = getInitialAppContext();

const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated);
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchases);
  const [profile, setProfile] = useState<User | null>(defaultValue.profile);

  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchases([]);
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context: AppContextInterface = useContext(AppContext);
  if (typeof context === 'undefined') throw new Error('useApp must be used within AppProvider');
  return context;
};
