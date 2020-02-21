# hotp-totp
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

