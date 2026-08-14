import { Button, Typography } from "@ellucian/react-design-system/core";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  spacing60,
  fontFamilyCondensed,
} from "@ellucian/react-design-system/core/styles/tokens";
import React from "react";
import { withIntl } from "../utils/ReactIntlProviderWrapper";
import PropTypes from "prop-types";

const styles = () => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    padding: spacing60,
  },
  pageButton: {
    fontFamily: fontFamilyCondensed,
    height: "fit-content",
    width: "fit-content",
    margin: "auto !important",
  },
});

const VIDCard = (props) => {
  const {
    classes,
    cardControl: { navigateToPage },
  } = props;

  return (
    <div className={`a1 ${classes.card}`}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Aleo:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&amp;display=swap;"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;display=swap"
      />
      <link
        rel="stylesheet"
        href="https://www.broward.edu/_files/css/btn-style.css"
      />
      <link
        rel="stylesheet"
        href="https://www.broward.edu/experience/_cms/exp-cards.css"
      />
      <link
        rel="stylesheet"
        href="https://www.broward.edu/experience/_cms/exp-icons.css"
      />

      <Typography variant="h2" component="h2">
        Access Your Virtual Student ID Anytime
      </Typography>

      <Typography variant="body2">
        Use your digital ID for campus services, events, and student
        verification.
      </Typography>

      <Button
        className={`btn primaryN ${classes.pageButton}`}
        onClick={navigateToPage}
      >
        View My Student ID
      </Button>
    </div>
  );
};

VIDCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withIntl(
  withStyles(VIDCard, styles, {
    name: "VIDCard",
  }),
);
