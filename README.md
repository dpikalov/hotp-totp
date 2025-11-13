# hotp-totp
[![npm install](https://img.shields.io/npm/v/hotp-totp)](https://npmjs.com/package/hotp-totp)
[![npm install](https://img.shields.io/npm/l/hotp-totp)](https://npmjs.com/package/hotp-totp)
[![npm install](https://img.shields.io/npm/dm/hotp-totp)](https://npmjs.com/package/hotp-totp)


Generate One-Time passwords in JS using WebCrypto

## Usage

```
// Time-based one-time password
await totp('SECRETSECRET')
```

```
// HMAC-based one-time password
await hotp('SECRETSECRET', 0 /* counter */) #=> 977742
```

## Installation

      $ npm install hotp-totp

