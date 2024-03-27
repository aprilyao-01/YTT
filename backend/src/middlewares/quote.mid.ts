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
    c: string;
    d: string;
    dp: string;
    h: string;
    l: string;
    o: string;
    pc: string;
    t: string;
    color: string;
}

export const formatQuote = (quote: QuoteItem): QuoteResult => {
    const result: QuoteResult = {
        c: quote.c.toFixed(2),
        d: quote.d.toFixed(2),
        dp: quote.dp.toFixed(2),
        h: quote.h.toFixed(2),
        l: quote.l.toFixed(2),
        o: quote.o.toFixed(2),
        pc: quote.pc.toFixed(2),
        t: quote.t.toFixed(2),
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