import useCartStore from "../store/useCartStore";

export const logout = (navigate) => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

 
  navigate("/login", { replace: true });
};
