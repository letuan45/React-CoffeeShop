import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import { modalActions } from "../../store/index";

const RouterToTop = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(modalActions.resetAllModal());
  }, [location, dispatch]);

  return <>{props.children}</>;
};

export default RouterToTop;