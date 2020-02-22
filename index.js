import base32 from 'thirty-two';

/* Time-based OTP */
const totp = async (secret) => {
    return hotp( secret, Math.floor( +new Date() / 30000 ) );
}

/* HMAC-based OTP */
const hotp = async (secret, counter) => {

    // Uint8Array(20)
    const hmac = async (secret, counter) => {
        const keyData = Uint8Array.from(base32.decode(secret));
        const key     = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: { name: 'SHA-1' } },
            false,
            ['sign']
        );

        return new Uint8Array(
            await crypto.subtle.sign('HMAC', key, padCounter(counter))
        );
    }

    // Uint8Array(8)
    const padCounter = (counter) => {
        const pairs = counter.toString(16).padStart(16, '0').match(/..?/g);
        const array = pairs.map(v => parseInt(v, 16));
        return Uint8Array.from( array );
    }

    // Number
    function truncate(hs) {
        const offset = hs[19] & 0b1111;
        return ((hs[offset] & 0x7f) << 24) | (hs[offset + 1] << 16) | (hs[offset + 2] << 8) | hs[offset + 3];
    }

    // HOTP(K, C) = truncate(HMAC(K, C))
    const num = truncate( await hmac(secret, counter) );

    // return 6 digits, padded with leading zeros
    return num.toString().padStart(6, '0').slice(-6);
}

/**/
export default {
    hotp,
    totp,
}
