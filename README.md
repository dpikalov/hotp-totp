# hotp-totp
[![npm](https://flat.badgen.net/npm/v/hotp-totp)](https://npmjs.com/package/hotp-totp)
[![npm license](https://flat.badgen.net/npm/license/hotp-totp)](https://npmjs.com/package/hotp-totp)
[![npm downloads](https://flat.badgen.net/npm/dm/hotp-totp)](https://npmjs.com/package/hotp-totp)

Generate One-Time passwords in JS using WebCrypto

## Usage

```
await totp('SECRETSECRET')
```

```
await hotp('SECRETSECRET', 0 /* counter */) #=> 977742
```

## Installation

      $ npm install hotp-totp

