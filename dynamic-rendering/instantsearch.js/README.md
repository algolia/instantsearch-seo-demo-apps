# Dynamic rendering with instantsearch.js

1. make sure rendertron instance is running
  Go [instantsearch-rendertron-1.herokuapp.com/render](https://instantsearch-rendertron-1.herokuapp.com/render), you should see: 
  
  ```
  Not Found
  ```
  
  You can check it's ready to prerender by going on: 
  - [https://instantsearch-rendertron-1.herokuapp.com/render/https://algolia.com]  (https://instantsearch-rendertron-1.herokuapp.com/render/https://algolia.com) 
  - [https://instantsearch-rendertron-1.herokuapp.com/render/https://community.algolia  .com/instantsearch.js/v2/examples/e-commerce/](https://instantsearch-rendertron-1.herokuapp.com/render/https://community.algolia.com/instantsearch.js/v2/examples/e-commerce/)
  - [https://instantsearch-rendertron-1.herokuapp.com/render/<https://mywebsite.com>](https://instantsearch-rendertron-1.herokuapp.com/render/<https://mywebsite.com>)

2. Install the dependencies and run the local server:

  ```sh
  yarn
  yarn start
  ```
  The server should start on `http://localhost:3000` 
  
2. Set up an tunnel to make this server accessible outside your network:

  ```bash
  ssh -R 80:localhost:3000 serveo.net
  ```
  @samouss: You can also use ngrok 

3. You should get an url of the form `https://*****.serveo.net/`. Open it. 
4. Check preprendering is enabled:
  - Use curl with [one of the supported user agents](https://github.com/GoogleChrome/rendertron/blob/f24343efc77b304664d2f1a682da706418c7eb89/middleware/src/middleware.ts#L25-L40) and check it's prerendered.

    ```sh
    curl --user-agent "bingbot" http://localhost:3000
    ```
  - Use your browser 


