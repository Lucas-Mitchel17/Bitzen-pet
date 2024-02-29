import { Notify } from "quasar";

export function setupRouterMiddleware(router) {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("AUTH_TOKEN");
    console.log(isAuthenticated);

    if (to.meta.requiresAuth) {
      if (!isAuthenticated) {
        Notify.create({
          type: "negative",
          message: "Faça login para continuar",
        });

        next({ path: "entrar" });
      } else {
        next();
      }
    } else if (isAuthenticated) {
      next({ path: "seus-pets" });
    } else {
      next();
    }
  });
}
