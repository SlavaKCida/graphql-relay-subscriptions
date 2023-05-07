import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

export enum QueryListKey {
  Users = 'Users',
  Posts = 'Posts',
}

const generateKey = () => String(new Date().valueOf())

const initialKeys = {
  [QueryListKey.Posts]: generateKey(),
  [QueryListKey.Users]: generateKey(),
}

export const QueryKeyContext = createContext<{
  keys: { [K in QueryListKey]: string }
  updateKey: (v: QueryListKey) => void
}>({
  keys: initialKeys,
  updateKey: () => {
    return
  },
})

export const QueryKeyContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [keys, setKeys] = useState<{ [K in QueryListKey]: string }>(initialKeys)

  const updateKey = useCallback((key: QueryListKey) => {
    console.log('Updating fetch key', key)
    setKeys((s) => ({ ...s, [key]: generateKey() }))
  }, [])

  return (
    <QueryKeyContext.Provider value={{ keys, updateKey }}>
      {children}
    </QueryKeyContext.Provider>
  )
}

export const useQueryKeys = () => useContext(QueryKeyContext)
