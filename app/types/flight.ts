export interface IDestination {
  data: IFlightDestination[];
}

export interface IFlightDestination {
  id: string;
  type: "AIRPORT" | string;
  name: string;
  code: string;
  city: string;
  cityName: string;
  regionName: string;
  country: string;
  countryName: string;
  countryNameShort: string;
  photoUri: string;
  distanceToCity: {
    value: number;
    unit: string;
  };
  parent: string;
}

export interface IFlight {
  data: {
    flightOffers: FlightOfferResponse[];
  };
}

export interface FlightOfferResponse {
  token: string;
  segments: Segment[];
  priceBreakdown: {
    total: {
      currencyCode: string;
      nanos: number;
      units: number;
    };
  };
  tripType: string;
}

export interface Segment {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  legs: Leg[];
  totalTime: number;
  travellerCheckedLuggage: TravellerLuggage[];
  travellerCabinLuggage: TravellerLuggage[];
}

export interface Leg {
  cabinClass: string;
  flightInfo: FlightInfo;
  carriers: string[];
  carriersData: CarrierData[];
  totalTime: number;
  flightStops: any[];
  amenities: any[];
}

export interface FlightInfo {
  facilities: any[];
  flightNumber: number;
  planeType: string;
  carrierInfo: CarrierInfo;
}

export interface CarrierInfo {
  operatingCarrier: string;
  marketingCarrier: string;
  operatingCarrierDisclosureText: string;
}

export interface CarrierData {
  name: string;
  code: string;
  logo: string;
}

export interface Airport {
  city: string;
  cityName: string;
  code: string;
  country: string;
  countryName: string;
  name: string;
}

export interface TravellerLuggage {
  travellerReference: string;
  luggageAllowance: LuggageAllowance;
}

export interface LuggageAllowance {
  luggageType: string;
  ruleType?: string;
  maxPiece: number;
  maxWeightPerPiece: number;
  massUnit: string;
}
