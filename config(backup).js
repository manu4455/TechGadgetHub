// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//       appDir: true,
//     },
//     env: {
//       API_URL: "http://localhost:3000/",
//       DB_URI: "mongodb+srv://manujamatia1111:manujamatia1111@cluster0.xovjlk0.mongodb.net/yoyo?retryWrites=true&w=majority&appName=Cluster0",
  
//       CLOUD_NAME: "dnjyspos5",
//       CLOUDINARY_API_KEY: "545858354688721",
//       CLOUDINARY_API_SECRET: "-2DHPIZ9X_RqEC9BfWyXfhuT95E",
  
//       STRIPE_PUBLIC_KEY: "pk_test_51OvhwMSJX3dqNlZNOvHIal9EvIYxuXGzEBku0VTc9AvIrN0srt0d5e8nJeXpM88fY3CBpnnB4ijx3PjrRHh4Go0a00OrHqCTCE",
//       STRIPE_PRIVATE_KEY: "sk_test_51OvhwMSJX3dqNlZNZVI5A24t4h24Ih6UyRboGflrqTbCdODCQPjJl5UmMWmXXxoqK7CiLjHS7KIUteac82AUFGWW00PKx5NbWM",
  
//       STRIPE_WEBHOOK_SECRET: "whsec_ce5e0c58cf2e7e339f84b5ea7c2d3ece46652e270844a2ca80b381d0eb950b68",
//       NEXTAUTH_URL: "http://localhost:3000/",
  
  
//       NEXTAUTH_SECRET: "codingwithabbas",
//       ALGOLIA_APP_ID:"TKUMQM922A",
//       ALGOLIA_API_KEY:"8fea76f71fad3c08f590d01049f9501f",
//       ALGOLIA_INDEX_NAME:"TechYo",
//       ALGOLIA_ADMIN_API_KEY:"18c9474595f578e61cc9eca5c1b79010"
  
//     },
//     images: {
//       domains: ["res.cloudinary.com"],
//     },
//   };
  
//   module.exports = nextConfig;
  

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "http://localhost:3000/",
    DB_URI: "mongodb+srv://manujamatia1111:manujamatia1111@cluster0.xovjlk0.mongodb.net/yoyo?retryWrites=true&w=majority&appName=Cluster0",
    // DB_URI: "mongodb+srv://singhmansi:mansi@2000@cluster0.pofprm9.mongodb.net/mango?retryWrites=true&w=majority&appName=Cluster0",
    CLOUD_NAME: "dnjyspos5",
    CLOUDINARY_API_KEY: "545858354688721",
    CLOUDINARY_API_SECRET: "-2DHPIZ9X_RqEC9BfWyXfhuT95E",

    STRIPE_PUBLIC_KEY: "pk_test_51P8jGeIJCBER49jDJftRt7L1GFgZmby8WAlPYg1njIQfIhYffsDJfNc38ZAAAP4HhyIr9IDbjadueJuBmQkOjJRb00TVSf42qH",
    STRIPE_PRIVATE_KEY: "sk_test_51P8jGeIJCBER49jDzjOw2WXcO3EP2dr7WQWgt0Kd06mS4OTmDQJ8uKlGNIOIKxTB664L27Bvo6gD8aITYMytOYVT000FXwRcyG",

    STRIPE_WEBHOOK_SECRET: "whsec_ce5e0c58cf2e7e339f84b5ea7c2d3ece46652e270844a2ca80b381d0eb950b68",
    STRIPE_TAX:"txr_1P8jInIJCBER49jD5LiyI3ba",
    STRIPE_SHIPPING:"shr_1P8jIJIJCBER49jDQ26HRURm",
    NEXTAUTH_URL: "http://localhost:3000/",


    NEXTAUTH_SECRET: "codingwithabbas",
    ALGOLIA_APP_ID:"TKUMQM922A",
    ALGOLIA_API_KEY:"8fea76f71fad3c08f590d01049f9501f",
    ALGOLIA_INDEX_NAME:"TechYo",
    ALGOLIA_ADMIN_API_KEY:"18c9474595f578e61cc9eca5c1b79010"

  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
