This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, setup your next.config.js file:
```
module.exports = {
    env: {
      MONGO_SRV: "YOUR MONGO URL",
      JWT_SECRET: "YOUR_JWT_SECRET_KEY"
    }
  };
  ```
Then run 
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
