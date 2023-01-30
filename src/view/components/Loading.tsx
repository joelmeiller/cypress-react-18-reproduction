import { Loading as FrrLoading } from 'frr-web/lib/components/Loading'
import React, { ReactNode, useEffect } from 'react'

export const Loading = (props: { children?: ReactNode; label: string }) => {
  const [error, setError] = React.useState<string | null>(null)
  useEffect(() => {
    const id = setTimeout(() => {
      setError(`Time-out while ${props.label}`)
    }, 20000)
    return () => {
      clearTimeout(id)
    }
  }, [props.label])

  if (error) throw error

  return (
    <div
      style={{
        width: '100vw',
        height: 'var(--view-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        flexDirection: 'column',
      }}
    >
      <FrrLoading style={{ transform: 'scale(0.5)', marginBottom: 32 }} />

      {props.children}
    </div>
  )
}
