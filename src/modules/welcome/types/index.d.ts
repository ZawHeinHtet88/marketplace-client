
export interface FeaturedProduct {
    "name": string,
    "body": string,
    "description": string,
    "category": string,
    "type": string,
    "brand": string,
    "tags": string[],
    "colors": [],
    "sizes": [],
    "images": string[]
    "price": number,
    "inventory": number,
    "shipping": number,
    "status": number,
    "isFeatured": boolean,
    "cashOnDelivery": boolean,
    "merchant": {
        businessName : string;
        logo : string
    },
    "createdAt": string,
    "updatedAt": string,
    "id": string
}

export interface PopularType {
    "_id": string,
    "name": string,
    "image": string,
}