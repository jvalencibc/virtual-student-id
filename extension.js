const helper = require("./src/i18n/manifest.helper.js");

module.exports = {
  name: "Virtual Student ID",
  publisher: "JV",
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
      type: "VID",
      source: "./src/cards/id",
      miniCardIcon: "user",
      category: "myaccount",
      title: "Virtual Student ID",
      displayCardType: "VID",
      description: "Virtual Student ID",
      queries: {
        "get-person": [
          {
            resourceVersions: { persons: { min: 12 } },
            query: `query personInformation($personId:ID) {
                        persons:{persons}( filter: { id: { EQ: $personId } }) {
                            edges {
                                node {
                                    names {
                                    firstName
                                    lastName
                                    fullName
                                    }
                                    id
                                    dateOfBirth
                                    roles {
                                    role
                                    }
                                    emails {
                                    type {
                                        emailType
                                    }
                                    address
                                    preference
                                    }
                                    phones {
                                    type {
                                        phoneType
                                    }
                                    number
                                    preference
                                    }
                                    credentials {
                                    type
                                    value
                                    }
                                    veteranStatus {
                                    category
                                    }
                                }
                            }
                        }
                    }`,
          },
        ],
      },
    },
  ],
  page: {
    source: "./src/page/index.jsx",
  },
  queries: {
    "get-person": [
      {
        resourceVersions: { persons: { min: 12 } },
        query: `query personInformation($personId:ID) {
                    persons:{persons}( filter: { id: { EQ: $personId } }) {
                        edges {
                            node {
                                names {
                                firstName
                                lastName
                                fullName
                                }
                                id
                                dateOfBirth
                                roles {
                                role
                                }
                                emails {
                                type {
                                    emailType
                                }
                                address
                                preference
                                }
                                phones {
                                type {
                                    phoneType
                                }
                                number
                                preference
                                }
                                credentials {
                                type
                                value
                                }
                                veteranStatus {
                                category
                                }
                            }
                        }
                    }
                }`,
      },
    ],
  },
};
