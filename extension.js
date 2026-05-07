const helper = require("./src/i18n/manifest.helper.js");

module.exports = {
  name: "vid-test",
  publisher: "Sample",
  configuration: {
    client: [
      {
        key: "extension-client-url",
        label: "extension client url",
        type: "url",
        required: false,
      },
      {
        key: "extension-client-text",
        label: "extension client text",
        type: "text",
      },
      {
        key: "extension-client-password",
        label: "extension client password",
        type: "password",
      },
    ],
    server: [
      {
        key: "extension-server-url",
        label: "extension server url",
        type: "url",
        required: false,
      },
      {
        key: "extension-server-text",
        label: "extension server text",
        type: "text",
      },
      {
        key: "extension-server-password",
        label: "extension server password",
        type: "password",
      },
    ],
  },
  cards: [
    {
      type: "VIDTestCard",
      source: "./src/cards/VIDTestCard",
      miniCardIcon: "user",
      category: "work",
      title: "VID Test",
      displayCardType: "VID Test",
      description: "VID Test",
      pageRoute: {
        route: "/",
      },
    },
  ],
  page: {
    source: "./src/page/index.jsx",
  },
};
