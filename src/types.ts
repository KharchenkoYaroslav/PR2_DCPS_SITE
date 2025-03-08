export interface Meter {
    id: number;
    number: string;
    created_at: string;
  }
  
  export interface Reading {
    id: number;
    meter: Meter;
    day_reading: number;
    night_reading: number;
    reading_date: string;
  }
  
  export interface Bill {
    id: number;
    meter: Meter;
    amount: number;
    generated_at: string;
  }
  
  export interface Tariff {
    id: number;
    day_rate: number;
    night_rate: number;
    day_penalty: number;
    night_penalty: number;
    updated_at: string;
  }
  