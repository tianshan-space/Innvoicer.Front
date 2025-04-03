import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  isMenuOpen = false;
  isMonthly: boolean = true;

  scrollTo(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (this.isMenuOpen) {
      navLinks?.classList.add('show');
    } else {
      navLinks?.classList.remove('show');
    }
  }

  togglePricing(plan: 'monthly' | 'annual'): void {
    this.isMonthly = plan === 'monthly';
  }
}
