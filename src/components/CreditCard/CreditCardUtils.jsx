import Payment from 'payment';

const clearNumber = (value = '') => {
    return value.replace(/\D+/g, '');
}

const formatCreditCardNumber = (value) => {
    if (!value) return value;

    const issuer = Payment.fns.cardType(value);
    const clearValue = clearNumber(value);
    let nextValue;

    switch (issuer) {
        case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10,
            )} ${clearValue.slice(10, 15)}`;
            break;
        case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10,
            )} ${clearValue.slice(10, 14)}`;
            break;
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                8,
            )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
            break;
    }

    return nextValue.trim();
}

const formatName = (value) => {
    const clearValue = value.replace(
        /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
        ""
    );

    return clearValue;
}

const formatCVC = (value, allValues = {}) => {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number);
        maxLength = issuer === 'amex' ? 4 : 3;
    }

    return clearValue.slice(0, maxLength);
}

const createData = ( ) => {
    const cards = [
        {
            number: '5555 4444 3333 1111',
            name: 'Kacey Frami',
            expiry: '01',
            expiryyear: '2024',
            cvc: '282'
        },
        {
            number: "5555 4444 3333 1111",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },

        {
            number: "4111 1111 1111 1111",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },
        {
            number: "3700 000000 00002",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },
        {
            number: "3600 666633 3344",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },
        {
            number: "6011 6011 6011 6611",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },
        {
            number: "5066 9911 1111 1118",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },
        {
            number: "6250 9460 0000 0016",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        },
        {
            number: "6062 8288 8866 6688",
            name: "John Smith",
            expiry: "10",
            expiryyear: "2025",
            cvc: "737"
        }
    ]
    const min = 0;
    const max = cards.length - 1;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return cards[randomNumber];
}

export { formatCreditCardNumber, formatName, formatCVC, createData };
