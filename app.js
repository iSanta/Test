require('dotenv').config()
const axios = require('axios');

const shopName = process.env.SHOP;
const accessToken = process.env.TOKEN;

axios.get(`https://${shopName}/admin/api/2023-10/products.json`, {
  headers: {
    'X-Shopify-Access-Token': accessToken
  }
})
  .then(response => {
    let data = response.data.products;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const createdAt = new Date(data[key].created_at);
          const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
          data[key].created_at = formattedDate;
        }
      }
      console.log(data);

  })
  .catch(error => {
    console.error('Error:', error);
  });