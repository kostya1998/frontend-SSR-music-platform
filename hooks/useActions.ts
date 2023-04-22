import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "@/Store/action-creators";
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
