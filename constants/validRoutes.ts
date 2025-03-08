const validRoutes = [
    /^\/$/,                    
    /^\/about$/,              
    /^\/contact$/,             // "/contact"
    /^\/blog\/[^/]+$/,         // "/blog/:id" (bất kỳ id nào)
    /^\/product\/[^/]+$/,      // "/product/:id"
    /^\/user\/[^/]+$/,         // "/user/:username"
  ];

  export default validRoutes;