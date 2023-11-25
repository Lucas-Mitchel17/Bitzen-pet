const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "entrar", component: () => import("pages/LoginPage.vue") },
      { path: "cadastro", component: () => import("pages/SignUpPage.vue") },
      {
        path: "esqueceu-sua-senha",
        component: () => import("pages/ForgotPasswordPage.vue"),
      },
      {
        path: "codigo-de-verificacao",
        component: () => import("pages/EmailCodePage.vue"),
      },
      {
        path: "nova-senha",
        component: () => import("pages/NewPasswordPage.vue"),
      },
      {
        path: "seus-pets",
        component: () => import("pages/YourPetsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
