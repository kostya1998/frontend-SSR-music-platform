import { RootState } from "@/Store/reducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
