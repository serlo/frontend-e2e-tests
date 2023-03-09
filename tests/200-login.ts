import { loginAs, logout } from '../helpers'

Feature('Login')

Scenario('Login user', ({ I }) => {
  loginAs(I, 'dal')
})

Scenario('Logout user', ({ I }) => {
  logout(I)
})
