const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "entrar",
        component: () => import("pages/LoginPage/LoginPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "cadastro",
        component: () => import("pages/SignUpPage/SignUpPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "esqueceu-sua-senha",
        component: () => import("pages/ForgotPasswordPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "codigo-de-verificacao",
        component: () => import("pages/EmailCodePage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "nova-senha",
        component: () => import("pages/NewPasswordPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "seus-pets",
        component: () => import("pages/YourPetsPage/YourPetsPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "pet/:id",
        component: () => import("pages/PetPage/PetPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "cadastrar-novo-pet",
        component: () => import("pages/NewPetPage/NewPetPage.vue"),
        meta: {
          requiresAuth: true,
        },
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
