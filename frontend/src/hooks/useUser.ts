import { register } from "../redux/auth/authApi"
import { RegisterArg } from "../redux/auth/types"
import { selectUser } from "../redux/auth/userSlice"
import useAppDispatch from "./useAppDispatch"
import useAppSelector from "./useAppSelector"

const useUser = () => {
  const state = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const handleRegister = (arg: RegisterArg) => dispatch(register(arg))

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
      register: handleRegister
    }
  }
}

export default useUser
