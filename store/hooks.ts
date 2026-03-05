import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// ✅ typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;