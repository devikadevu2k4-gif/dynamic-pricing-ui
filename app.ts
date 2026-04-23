import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Requirement 4: Percentage-based charge
  taxRate = signal(12); 

  // Requirement 4: Nested Structures & Fixed Prices
  pricingData = signal([
    { 
      tier: 'Basic Plan', 
      price: 99, 
      setupFee: 10, // Fixed Price Charge
      features: ['10GB Storage', 'Basic Support'] 
    },
    { 
      tier: 'Standard Plan', 
      price: 199, 
      setupFee: 25, // Fixed Price Charge
      features: ['50GB Storage', 'Priority Support'] 
    }
  ]);

  // Requirement 2: Editable Form Logic
  updatePrice(index: number, newPrice: string) {
    this.pricingData.update(current => {
      const updated = [...current];
      updated[index] = { ...updated[index], price: Number(newPrice) };
      return updated;
    });
  }

  // Requirement 3: Dynamic Functionality
  addColumn() {
    const newPlan = { 
      tier: 'New Tier', 
      price: 0, 
      setupFee: 5, 
      features: ['Custom Feature'] 
    };
    this.pricingData.update(current => [...current, newPlan]);
  }

  removeColumn(index: number) {
    this.pricingData.update(current => current.filter((_, i) => i !== index));
  }

  // Requirement 4: Data Transformation Logic
  calculateTotal(price: number, setup: number) {
    const tax = price * (this.taxRate() / 100);
    return price + setup + tax;
  }
}

