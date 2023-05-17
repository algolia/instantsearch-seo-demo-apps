# Dynamic rendering with instantsearch.js

### Demo

This demo relies on a rendertron instance that you have already set up.

### Run this for development

#### 1. make sure rendertron instance is running  

Go to `https://<MY_RENDERTRON_INSTANCE>/render`, you should see:
  
  ```
  Not Found
  ```
  
You can check it's ready to prerender by going on: 
  - `https://<MY_RENDERTRON_INSTANCE>/render/https://algolia.com`
  - `https://<MY_RENDERTRON_INSTANCE>/render/<https://MY_WEBSITE>`

Depending on your rendertron instance configuration, you need to give it some time to warm up.

#### 2. Install the dependencies and run the local server:

You also need to edit `index.js` to point `proxyUrl` to your rendertron instance.

```sh
yarn
yarn start
```

The server should start on `http://localhost:3000`.

#### 3. Set up a tunnel to make this server accessible outside your network:

```bash
ssh -R 80:localhost:3000 serveo.net
```

> **Note**
> You can also use ngrok for this step too. 

You should get an url of the form `https://*****.serveo.net/`. Open it. 

#### 4. Check preprendering works:
  - Use curl with [one of the supported user agents](https://github.com/GoogleChrome/rendertron/blob/f24343efc77b304664d2f1a682da706418c7eb89/middleware/src/middleware.ts#L25-L40) and check it's prerendered.
  
    ```sh
    curl --user-agent "bingbot" https://*****.serveo.net
    ```
    
  - Use your browser 
    You need to change the user agent of your browser to add [one of the supported user agents](https://github.com/GoogleChrome/rendertron/blob/f24343efc77b304664d2f1a682da706418c7eb89/middleware/src/middleware.ts#L25-L40) 
    
   ![prerendering in the browser](./prerendering-in-browser.gif) 

#### 5. Prepare for deployment:

When you're ready for deployment, make sure you set the right website endpoint in `robots.txt` and generate your sitemap.
