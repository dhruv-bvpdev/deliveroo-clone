# Deliveroo-Clone

A food ordering app built using Expo

## Screenshots

![Home](/screenshots/home.jpg?raw=true)
![Restaurant](/screenshots/restaurant.jpg?raw=true)
![Cart](/screenshots/cart.jpg?raw=true)
![Payment](/screenshots/payment.jpg?raw=true)
![Wait](/screenshots/wait.jpg?raw=true)
![Map](/screenshots/map.jpg?raw=true)

## Tech Stack

**Client:** Expo, React-Native, React, Redux, TailwindCSS,

**Server:** Node, Express, Stripe

**Database:** Sanity

## Run Locally

Clone the project

```bash
  git clone https://github.com/dhruv-bvpdev/deliveroo-clone.git
```

Go to the project directory

```bash
  cd deliveroo-clone
```

```bash
  cd client/server/sanity
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  expo r -c/npm run dev/sanity start
```

## Environment Variables (Client)

To run this project, you will need to add the following environment variables to your .env file

`SANITY_PROJECT_ID`

`SANITY_DATA_SET`

`API_URL`

## Environment Variables (Server)

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`NODE_ENV`

`STRIPE_PUB_KEY`

`STRIPE_PRIV_KEY`

`PROJECT_PATH`
