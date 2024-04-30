import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginFormBgContainer,
  LoginFormContainer,
  LoginFormButton,
  LoginFormInput,
  LoginFormcheckBox,
  LoginFormLabel,
  LoginFormCheckBoxContainer,
  LoginFormLogo,
} from './styledComponents'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    console.log('submit')
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword} = this.state
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginFormBgContainer onSubmit={this.onSubmitForm}>
        <LoginFormContainer>
          <LoginFormLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <LoginFormLabel htmlFor="username">USERNAME</LoginFormLabel>
          <LoginFormInput
            placeholder="Username"
            id="username"
            onChange={this.onChangeUserName}
            value={username}
            type="input"
          />
          <LoginFormLabel htmlFor="password">PASSWORD</LoginFormLabel>
          <LoginFormInput
            placeholder="Password"
            onChange={this.onChangePassword}
            value={password}
            type={showPassword ? 'text' : 'password'}
            id="password"
          />
          <LoginFormCheckBoxContainer>
            <LoginFormcheckBox
              type="checkbox"
              id="checkBox"
              onChange={this.onChangeCheckBox}
            />
            <LoginFormLabel htmlFor="checkBox">Show Password</LoginFormLabel>
          </LoginFormCheckBoxContainer>
          <LoginFormButton type="submit">Login</LoginFormButton>
          {showSubmitError && <p>{errorMsg}</p>}
        </LoginFormContainer>
      </LoginFormBgContainer>
    )
  }
}
export default LoginForm
