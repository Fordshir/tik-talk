import {Routes} from "@angular/router";
import {FormHw} from "@tt/experimental";
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {chatsRoutes} from '@tt/chats';
import {profileFeature, ProfileEffects, canActivateAuth, PostsEffects, postsFeature} from '@tt/data-access';
import {ProfilePage, SearchPage, SettingsPage} from '@tt/profile';
import {LoginPage} from '@tt/auth';
import {Layout} from '@tt/layout';

export const routes: Routes = [
  { path: "experimental", component: FormHw },
  {
    path: "",
    component: Layout,
    children: [
      { path: "", redirectTo: "profile/me", pathMatch: "full" },
      {
        path: "profile/:id",
        component: ProfilePage,
        providers:[
          provideState(postsFeature),
          provideEffects(PostsEffects)
        ]
      },
      { path: "settings", component: SettingsPage },
      {
        path: "search",
        component: SearchPage,
        providers:[
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: "chats",
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: "login", component: LoginPage },
];
