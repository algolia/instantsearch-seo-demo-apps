# Dynamic rendering with instantsearch.js

1. make sure rendertron instance is running

1. To run this project locally, install the dependencies and run the local server:

  ```sh
  yarn
  yarn start
  ```

2. Open `http://localhost:8081` in your browser. It should work **without** prerendering.
3. Use curl with [one of the supported user agents](https://github.com/GoogleChrome/rendertron/blob/f24343efc77b304664d2f1a682da706418c7eb89/middleware/src/middleware.ts#L25-L40) and check it's prerendered.

```sh
curl --user-agent "bingbot" http://localhost:8081 
```

