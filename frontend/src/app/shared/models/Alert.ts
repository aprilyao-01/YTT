export class Alert {
    constructor(public type: string, public condition: string, public message: string, public dismissible: boolean) {}
}
  
export const ALERTS: Alert[] = [
    // search page
    {
        type: 'danger',
        condition: 'noInput',
        message: 'Please enter a valid ticker',
        dismissible: true
    },
    {
        type: 'danger',
        condition: 'notFound',
        message: 'No data found. Please enter a valid ticker',
        dismissible: false
    },
    {
        type: 'success',
        condition: 'buySuccess',
        message: 'bought successfully',
        dismissible: true
    },

    // watchlist page
    {
        type: 'warning',
        condition: 'emptyWatchlist',
        message: 'Currently you don\'t have any stock in your watchlist',
        dismissible: false
    },

    // portfolio page

    
    // undefined
    {
        type: 'custom',
        condition: 'undefined',
        message: 'This alert is undefined',
        dismissible: false
    },
];