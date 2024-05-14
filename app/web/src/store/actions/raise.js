import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { raise } from "./actionsCreator";

const RaiseAction = (montant) => {
  const dispatch = useDispatch();
  const pot = useSelector((state) => state.gameReducer.pot);
  const res = pot + montant;
  dispatch(raise(res));
  return null;
};

export default RaiseAction;
