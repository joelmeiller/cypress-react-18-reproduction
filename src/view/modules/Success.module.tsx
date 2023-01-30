import { P, H2 } from 'frr-web/lib/html'
import styled from 'styled-components'

export const SuccessModule = (props: {}) => {
  return (
    <Wrapper>
      <H2 label='sections.successTitle' dataTestId='success-title'/>
      <P label='sections.successDescription' dataTestId='success-description'/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 1000px;
  max-height: 480px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(0,0,0,0.01);
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
`
