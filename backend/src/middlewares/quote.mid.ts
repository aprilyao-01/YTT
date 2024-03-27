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
        color: ''
    };

    if (quote.d > 0) {
        result.color = 'text-success';
    } else if (quote.d < 0) {
        result.color = 'text-danger';
    } else {  // d == 0
        result.color = 'text-dark';
    }

    return result;
}