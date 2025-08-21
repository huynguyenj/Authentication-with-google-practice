import { createBrowserRouter } from "react-router";
import Root from "./Root";
import AuthenticationRoute from "./loader/AuthenticationRoute";

export const router = createBrowserRouter([
  {
    path:'/',
    Component: Root,
    children: [
      { 
        index: true,
        lazy: { 
          Component:  async () => (await import('../pages/HomePage')).default
        }
      },
      {
        path: 'alert',
        lazy: {
          Component: async () => (await import('../pages/AlertPage')).default
        }
      },
      {
        Component: AuthenticationRoute,
        children: [
          {
           path:'profile',
           lazy: {
              Component: async () => (await import('../pages/PersonalPage')).default
            }
          }
        ]
      }
    ]
  },
  {
    path:'/auth',
    children: [
      { 
        path: 'login', 
        lazy: { 
          Component:  async () => (await import('../pages/Login')).default
        }
      },
      { 
        path: 'register', 
        lazy:  { 
          Component:  async () => (await import('../pages/Register')).default
        }
      },
    ]
  }
])