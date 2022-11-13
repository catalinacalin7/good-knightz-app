import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesPageComponent } from './components/features-page/features-page.component';
import { PremiumPageComponent } from './components/premium-page/premium-page.component';

const routes: Routes = [
  { path: 'features', component: FeaturesPageComponent },
  { path: 'premium', component: PremiumPageComponent },
  { path: '**', redirectTo: 'features' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // or 'top'
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // [x, y] - adjust scroll offset
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
