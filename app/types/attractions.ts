export interface IAttraction {
    data: {
      products: IAttractionItem[];
    };
  }
  
  export interface IAttractionItem {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
  
    cancellationPolicy: {
      hasFreeCancellation: boolean;
    };
  
    representativePrice: {
      chargeAmount: number;
      currency: string;
      publicAmount: number;
    };
  
    primaryPhoto: {
      small: string;
    };
  
    reviewsStats: {
      allReviewsCount: number;
      percentage: string;
      combinedNumericStats: {
        average: number;
        total: number;
      };
    };
  
    ufiDetails: {
      bCityName: string;
      ufi: number;
      url: {
        country: string;
      };
    };
  
    offers: {
      items: {
        id: string;
      }[];
    }[];
  
    supportedFeatures: {
      nativeApp: boolean;
    };
  
    flags: {
      flag: string;
      value: boolean;
      rank: number;
    }[];
  }
  