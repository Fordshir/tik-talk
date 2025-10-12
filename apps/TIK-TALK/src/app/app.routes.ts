import {Routes} from "@angular/router";
import {LoginPage} from "@tt/auth";
import {SearchPage} from "@tt/profile";
import {ProfilePage} from "@tt/profile";
import {Layout} from "../../../../libs/layout/src";
import {SettingsPage} from "@tt/profile";
import {chatsRoutes} from "@tt/chats";
import {FormHw} from "./experimental/form-hw/form-hw";
import {canActivateAuth} from '@tt/data-access';

export const routes: Routes = [
  { path: "experimental", component: FormHw },
  {
    path: "",
    component: Layout,
    children: [
      { path: "", redirectTo: "profile/me", pathMatch: "full" },
      { path: "profile/:id", component: ProfilePage },
      { path: "settings", component: SettingsPage },
      { path: "search", component: SearchPage },
      {
        path: "chats",
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: "login", component: LoginPage },
];
