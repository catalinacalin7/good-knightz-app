import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesPageComponent } from './components/features-page/features-page.component';
import { PricingPageComponent } from './components/pricing-page/pricing-page.component';

const routes: Routes = [
  { path: 'features', component: FeaturesPageComponent },
  { path: 'pricing', component: PricingPageComponent },
  { path: '**', redirectTo: 'features' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
