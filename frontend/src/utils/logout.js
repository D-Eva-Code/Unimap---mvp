import useCartStore from "../store/useCartStore";

export const logout = (navigate) => {
  // Clear auth
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Clear cart (Zustand)
  useCartStore.getState().clearCart();

  // Optional: clear other app data
  localStorage.removeItem("cart");

  navigate("/login", { replace: true });
};
