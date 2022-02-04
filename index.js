// https://github.com/dpikalov/hotp-totp

const hexToBuf = (hex) => {
    const bytes = []
    for (let c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16))
    return new Uint8Array(bytes)
}

const b32ToHex = (base32) => {
    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let bits = ''
    let hex = ''

    for (let i = 0; i < base32.length; i++) {
        let val = base32chars.indexOf(base32.charAt(i).toUpperCase())
        bits += val.toString(2).padStart(5, '0')
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
        let chunk = bits.substring(i, i + 4)
        hex += parseInt(chunk, 2).toString(16)
    }
    return hex
}

/* Time-based OTP */
export const totp = async (secret) => {
    return hotp(secret, Math.floor(+new Date() / 30000))
}

/* HMAC-based OTP */
export const hotp = async (secret, counter) => {
    // Uint8Array(20)
    const hmac = async (secret, counter) => {
        // const keyData = Uint8Array.from(secret.split('').map((e) => parseInt(e, 32)))
        const keyData = hexToBuf(b32ToHex(secret))
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
