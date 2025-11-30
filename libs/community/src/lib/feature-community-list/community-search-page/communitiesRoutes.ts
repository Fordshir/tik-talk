import { Routes } from '@angular/router'
import { CommunitySearchPage } from './community-search-page'

export const communitiesRoutes: Routes = [
	{
		path: '',
		component: CommunitySearchPage,
		children: [{ path: ':id', component: CommunitySearchPage }]
	}
]
