import { useContext } from 'react';

export function createUseContext<T>(context: React.Context<T>) {
  return () => {
    const contextValue = useContext(context);
    if (!contextValue) {
      throw new Error('useContext must be inside a Provider with a value');
    }
    return contextValue;
  };
}
