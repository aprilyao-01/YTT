interface QuoteItem {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

interface QuoteResult {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
    color: string;
    markOpen: boolean;
    getQuoteTimestamp: string;
    lastTimestamp: string;
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const formatQuote = (quote: QuoteItem): QuoteResult => {
    const result: QuoteResult = {
        c: quote.c,
        d: quote.d,
        dp: quote.dp,
        h: quote.h,
        l: quote.l,
        o: quote.o,
        pc: quote.pc,
        t: quote.t,
        color: '',
        markOpen: true,
        getQuoteTimestamp: '',
        lastTimestamp:'',
    };

    if (quote.d > 0) {
        result.color = 'text-success';
    } else if (quote.d < 0) {
        result.color = 'text-danger';
    } else {  // d == 0
        result.color = 'text-dark';
    }

    result.getQuoteTimestamp = formatDate(new Date());
    const date = new Date(quote.t * 1000);
    result.lastTimestamp = formatDate(date);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    // Assume the market is closed if more than 5 minutes has elapsed from this ‘t’ value.
    // Assume the market is open, if otherwise.
    if (currentTimestamp - quote.t < 300) {
        result.markOpen = true;
    } else {
        result.markOpen = false;
    }

    return result;
}