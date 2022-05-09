<h1 align="center">
  Local Eats
</h1>
<p>Formerly Not UberEats<p>
<p>
This website was created to help showcase local restaurants in Toronto who offer their own delivery service.

By showcasing these restaurants I hope that we can help struggling businesses during this difficult time by putting more money in their pocket instead of third-party companies.

I built this site using Gatsby, using Contentful CMS and hosted on Netlify. For styling I'm using the React Bootstrap library.

View the running website - https://iwanteats.com/
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/8628a000-2043-4016-ac7c-d9c14559d7f7/deploy-status)](https://app.netlify.com/sites/optimistic-wing-8db644/deploys)

## 🚀 Quick start

**Prerequisites:**

Setup your contentful space by following [the instructions here](https://www.contentful.com/r/knowledgebase/gatsbyjs-and-contentful-in-five-minutes/)

Requires the following environment variables in a
.env.development file:

```
CONTENTFUL_ACCESS_TOKEN=<access-token>
CONTENTFUL_SPACE_ID=<space-id>
GATSBY_GOOGLE_PLACES_KEY=<used-for-location-search>
```

I've put samples of the content models in the /sample folder you can [import](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/) if you wish to. If you're interested in being a contributer I can provide you with the current site values.

1.  **Start developing.**

    Navigate to the repo and run:

    ```shell
    npm run develop
    ```
2.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!


3.  **Learn more**

    - [Gatsby](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
    - [Contentful](https://www.contentful.com/r/knowledgebase/gatsbyjs-and-contentful-in-five-minutes/)
    - [Netlify](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/)
    - [React Bootstrap](https://react-bootstrap.github.io/)
    - [Google API key](https://developers.google.com/maps/gmp-get-started)
