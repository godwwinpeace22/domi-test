# Domi Labs Test

A microservice that allows its users to see m last messages from a conversation thread of their choice

## Installation

To run, you should have [Node.js](https://nodejs.org/) and [NPM](https://npmjs.org/) installed

Then clone this repo

Install the dependencies and start the server.

```sh
cd domi-test
npm i & npm start
```

## Using the service

```sh
curl -X GET "http://localhost:3000?conversation=1&limit=50"
```

| Query string | Value                                                       |
| ------------ | ----------------------------------------------------------- |
| conversation | The conversation of choice - i.e either from list1 or list2 |
| limit        | The number of messages to be retrieved i.e last m messages  |

## Testing

```sh
npm test
```

## License

MIT
