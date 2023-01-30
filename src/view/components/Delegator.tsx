import { H1 } from 'frr-web/lib/html'
import { useState } from 'react'
import styled from 'styled-components'
import { Module } from '../../types/Module'
import { PersonModule } from '../modules/Person.module'
import { SuccessModule } from '../modules/Success.module'

export const ModuleDelegator = (props: {}) => {
  const [module, setModule] = useState<Module>(Module.PersonForm)

  const renderModule = () => {
    if (module === Module.PersonForm) {
      return <PersonModule onSubmit={() => setModule(Module.Success)} />
    } else if (module === Module.Success) {
      return <SuccessModule />
    }
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <H1 label={'app.title'} />
        {renderModule()}
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`

const ContentWrapper = styled.div`
  padding: 24px 64px;
  max-width: 1000px;
`
