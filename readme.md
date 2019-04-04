
# Toy Robot with react.

## to start development server:
- to install dependencies: run `yarn`
- to start webpack-dev-server: `yarn start`
- go to `http://localhost:8080/`

## to build app:
- to install dependencies: run `yarn`
- to start webpack-dev-server: `yarn build`

## to serve the app:
- webpack will create a `dist` folder.
- run `cd dist` from root folder
- serve `dist` folder with any http server: run in terminal `httpster`
  - (To install `httpster` run `yarn global add httpster`)
- In the browser go to `http://localhost:<port number>` (where `<port number>` is the number defined by http server)

## to run the tests:
- in the terminal run `yarn run test`


## To do:
- [x] solution design:
  - https://docs.google.com/drawings/d/1VezqjirjsqOubcS_Lo96JGqXnkjOS03mGT7wOLV4OzU/edit?usp=sharing

- [x] React containers: (stateful)
  - Board

- [x] React components: (stateless)
  - alert
  - button
  - fieldset
  - footer
  - nav
  - select
  - tile

- [x] Add Styles utilities: `/src/styles`
  - Add SASS mixin
  - Add SASS function
  - Add SASS color map
  - Add SASS Vars
  - Add responsive features

- [x] run jest
  - add unit test to components

- [x] Add proptypes to components

- [x] Accessibility Resources:
  - semantic HTML (use the correct html tags)
  - tab focus with logical order: page is navigable via keyboard.
  - aria-* HTML attributes: screen reader (voiceOver mac os) announce content.

WORK IN PROGRESS:
- [ ] add flow for type checking.

## Resources:
- https://reactjs.org/docs/accessibility.html
- https://webaim.org/techniques/screenreader/
- https://www.w3.org/TR/wai-aria-practices/
- https://www.w3.org/WAI/tutorials/forms/grouping/