import { register } from "../redux/auth/authApi"
import { RegisterArg } from "../redux/auth/types"
import { logOut, selectUser } from "../redux/auth/userSlice"
import useAppDispatch from "./useAppDispatch"
import useAppSelector from "./useAppSelector"

const useUser = () => {
  const state = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const handleRegister = (arg: RegisterArg) => dispatch(register(arg))
  const handleLogOut = () => dispatch(logOut())

  return {
    state: {
      firstName: state.user?.firstName,
      lastName: state.user?.lastName,
      email: state.user?.email,
      isAuthenticated: state.isAuthenticated,
      errors: state.errors,
      isLoading: state.isLoading,
    },
    actions: {
      register: handleRegister,
      logOut: handleLogOut
    }
  }
}

export default useUser
