import {Routes} from '@angular/router'
import {FormHw} from '@tt/experimental'
import {provideState} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {
  canActivateAuth,
  CommunityEffects,
  communityFeature,
  PostsEffects,
  postsFeature,
  ProfileEffects,
  profileFeature
} from '@tt/data-access'
import {ProfilePage, SearchPage, SettingsPage} from '@tt/profile'
import {LoginPage} from '@tt/auth'
import {Layout} from '@tt/layout'
import {CommunityPage, CommunitySearchPage} from '@tt/community'

export const routes: Routes = [
  {path: 'experimental', component: FormHw},
  {
    path: '',
    component: Layout,
    children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {
        path: 'profile/:id',
        component: ProfilePage,
        providers: [provideState(postsFeature), provideEffects(PostsEffects)]
      },
      {path: 'settings', component: SettingsPage},
      {
        path: 'search',
        component: SearchPage,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'community',
        component: CommunitySearchPage,
        providers: [
          provideState(communityFeature),
          provideEffects(CommunityEffects),
        ]
      },
      {
        path: 'community/:id',
        component: CommunityPage,
        providers: [provideState(postsFeature), provideEffects(PostsEffects)]
      },
      {
        path: 'chats',
        loadChildren: () => import('@tt/chats').then(m => m.chatsRoutes)
      }
    ],
    canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPage}
]
