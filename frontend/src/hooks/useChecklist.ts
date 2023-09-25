import { getChecklist } from "../redux/checklist/checklistApi"
import { selectChecklist } from "../redux/checklist/checklistSlice"
import useAppDispatch from "./useAppDispatch"
import useAppSelector from "./useAppSelector"

const useChecklist = () => {
  const state = useAppSelector(selectChecklist)
  const dispatch = useAppDispatch()

  const handleGetChecklist = (accessToken: string) => dispatch(getChecklist(accessToken))


  return {
    state: {
      data: state.data,
      errors: state.errors,
      isLoading: state.isLoading,
    },
    actions: {
      getChecklist: handleGetChecklist,
    }
  }
}

export default useChecklist
