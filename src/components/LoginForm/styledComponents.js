import styled from 'styled-components'

export const LoginFormBgContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Roboto';
`
export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: flex-start;
  padding: 40px;
  shadow: 1;
  @media (min-width: 768px) {
    width: 40%;
    padding: 40px;
  }
`
export const LoginFormLogo = styled.img`
  width: 30%;
  margin-bottom: 30px;
  align-self: center;
`

export const LoginFormLabel = styled.label`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #475569;
`
export const LoginFormInput = styled.input`
  padding: 5px;
  outline: none;
  width: 100%;
`
export const LoginFormCheckBoxContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`
export const LoginFormcheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export const LoginFormButton = styled.button`
  padding: 10px;
  outline: none;
  width: 100%;
  color: #ffffff;
  background-color: #3b82f6;
  border: none;
  border-radius: 10px;
`
