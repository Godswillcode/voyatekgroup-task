export interface IHotel {
    data: {
      hotels: IHotelItem[];
    };
  }
  
  export interface IHotelItem {
    accessibilityLabel: string;
    hotel_id: number;
    property: IProperty;
  }
  
  export interface IProperty {
    accuratePropertyClass: number;
    checkin: IHotelCheckIn;
    checkout: IHotelCheckIn;
    checkoutDate: string;
    checkinDate: string;
    countryCode: string;
    currency: string;
    id: number;
    isFirstPage: boolean;
    latitude: number;
    longitude: number;
    name: string;
    mainPhotoId: number;
    photoUrls: string[];
    position: number;
    propertyClass: number;
    qualityClass: number;
    rankingPosition: number;
    reviewCount: number;
    reviewScore: number;
    reviewScoreWord: string;
    ufi: number;
    wishlistName: string;
    priceBreakdown: {
      excludedPrice: IPriceObj;
      grossPrice: IPriceObj;
    };
  }
  
  export interface IPriceObj {
    value: number;
    currency: string;
  }
  
  export interface IHotelCheckIn {
    fromTime: string;
    untilTime: string;
  }
  