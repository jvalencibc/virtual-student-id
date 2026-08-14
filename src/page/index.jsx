import { withStyles } from "@ellucian/react-design-system/core/styles";
import {} from "@ellucian/react-design-system/core/styles/tokens";
import { Typography } from "@ellucian/react-design-system/core";
import { Fragment, useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useIntl } from "react-intl";
import { withIntl } from "../utils/ReactIntlProviderWrapper";
import JsBarcode from "jsbarcode";

const styles = () => ({
  idContainer: {
    margin: "auto",
    display: "flex",
    fontFamily: "arial",
  },
  outerCard: {
    margin: "auto",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "3.2px 3.2px 4.8px rgb(0 0 0 / 30%)",
    overflow: "hidden",
  },
  innerCard: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "200%",
    backgroundPosition: "50% -30px",
    maxWidth: "350px",
    position: "relative",
  },
  gradientOverlay: {
    background: `linear-gradient(
          180deg,
          #005596 0,
          #003478 52.08%,
          #442a7b 100%
        )`,
    position: "absolute",
    width: "100%",
    height: "100%",
    mixBlendMode: "multiply",
  },
  idRow: {
    display: "flex",
    flexDirection: "column",
  },
  rowGroup: {
    flex: "0 0 100%",
    maxWidth: "100%",
    position: "relative",
  },
  photoGroup: {
    flex: "0 0 100%",
    maxWidth: "100%",
    position: "relative",
    zIndex: "5",
  },
  photoID: {
    maxWidth: "180px",
    background: "#fff",
    padding: "6px",
    margin: "10px 0 0 10px",
    boxShadow: "10px 0px 20px rgb(0 0 0 / 16%)",
    display: "flex",
    flexDirection: "column",
  },
  idImg: {
    width: "100%",
    maxHeight: "175px",
  },
  idCategory: {
    width: "100%",
    background: "#125596",
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: "14px",
    padding: "4px 0",
  },
  under18: {
    background: "#00aeef",
  },
  veteran: {
    background: "#e31e25",
  },
  offsetBackground: {
    position: "absolute",
    background: "linear-gradient(to right, #fff 60%, #ffffffad)",
    width: "100%",
    left: "24px",
    height: "114%",
    top: "-14%",
  },
  textGroup: {
    flex: "0 0 100%",
    maxWidth: "100%",
    position: "relative",
  },
  textContent: {
    color: "#000",
    margin: "auto",
    textAlign: "left",
    position: "relative",
    padding: "0 24px",
  },
  textContentInner: {
    padding: "0 20px",
    paddingBottom: "20px",
  },
  tcH2: {
    marginTop: "15px",
    marginBottom: "5px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  textCode: {
    marginTop: "0px",
    fontSize: "18px",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  barcodeContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barcode: {
    background: "none !important",
    margin: "auto",
    display: "block",
    maxHeight: "50px",
  },
  issuedDate: {
    marginTop: "0px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "right",
    textTransform: "uppercase",
  },
  logosGroup: {
    flex: "0 0 100%",
    maxWidth: "100%",
    position: "relative",
  },
  logos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  logosImg: {
    width: "100%",
    maxWidth: "150px",
  },
});

/**
 * This page is invoked from the VID card.
 *
 * @param {Object.<string, *>} props Page props
 * @returns {React.Component}        The Props card
 */
const IDPage = (props) => {
  const {
    classes,
    pageControl: { setLoadingStatus, setErrorMessage },
    data: { getEthosQuery },
  } = props;

  const { setPageTitle } = usePageControl();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [fullName, setFullName] = useState();
  const [studentId, setStudentId] = useState();
  const [cardType, setCardType] = useState();
  const [cardClass, setCardClass] = useState();
  const intl = useIntl();

  useEffect(() => {
    (async () => {
      try {
        setLoadingStatus(true);

        const personsData = await getEthosQuery({ queryId: "get-person" });
        const { data: { persons: { edges: personEdges } = [] } = {} } =
          personsData;

        if (!personEdges || personEdges.length === 0) {
          throw new Error("User information not available");
        }

        const [person] = personEdges.map((edge) => edge.node);
        const {
          names: [
            {
              firstName: personFirstName,
              lastName: personLastName,
              fullName: personFullName,
            } = {},
          ] = [],
          credentials = [],
          veteranStatus = [],
          dateOfBirth,
        } = person;

        const { value: bannerId } =
          credentials.find((credential) => credential.type === "bannerId") ||
          {};
        const veteranCategory = veteranStatus?.[0]?.category;

        if (!bannerId) {
          throw new Error("Banner ID not available");
        }

        const under18 = (() => {
          if (!dateOfBirth) return false;

          const birthDate = new Date(dateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age < 18;
        })();

        const normalizedVeteranStatus =
          veteranCategory?.toLowerCase() === "veteran" ? "veteran" : "student";

        const cardType = under18
          ? "student under 18"
          : normalizedVeteranStatus === "veteran"
            ? "student veteran"
            : "student";

        const cardClass = under18
          ? "under18"
          : normalizedVeteranStatus === "veteran"
            ? "veteran"
            : "student";

        setFirstName(personFirstName);
        setLastName(personLastName);
        setFullName(personFullName);
        setStudentId(bannerId);
        setCardType(cardType);
        setCardClass(cardClass);
        setLoadingStatus(false);
        console.log("personsData", person);
      } catch (error) {
        console.error("Failed to load user info", error);
        setLoadingStatus(false);
        setErrorMessage({
          headerMessage: intl.formatMessage({ id: "IDPage-fetchFailed" }),
          textMessage: error.message,
          iconName: "error",
          iconColor: "#D42828",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    JsBarcode("#barcode", studentId, {
      displayValue: false,
      background: "rgba(255, 255, 255, 0)",
      height: 40,
      width: 3,
    });
  }, [studentId]);

  setPageTitle(intl.formatMessage({ id: "Page-title" }));

  const defaultImage =
    "https://www.broward.edu/experience/_images/bcid/dpi.webp";
  const [imageSrc, setImageSrc] = useState(
    `https://generalssb-test.browardsaas.elluciancloud.com:8101/BannerGeneralSsb/ssb/PersonalInformationPicture/picture?bannerId=${studentId}`,
  );

  return (
    <Fragment>
      <link
        rel="stylesheet"
        href="https://www.broward.edu/experience/_cms/exp-icons.css"
      />
      <div className={classes.idContainer}>
        <div className={classes.outerCard}>
          <div
            className={classes.innerCard}
            style={{
              backgroundImage: `
                                url(https://www.broward.edu/experience/_images/bcid/rectangle-10821.png)
                            `,
            }}
          >
            <div className={classes.gradientOverlay} />

            <div className={classes.idRow}>
              <div className={classes.photoGroup}>
                <div className={classes.photoID}>
                  {/*
                  <img
                    className={classes.idImg}
                    src={`https://generalssb-test.browardsaas.elluciancloud.com:8101/BannerGeneralSsb/ssb/PersonalInformationPicture/picture?bannerId=${studentId}`}
                    alt={`${firstName || ""} ${lastName || ""}`}
                  />
                  */}
                  <img
                    className={classes.idImg}
                    src={imageSrc}
                    alt={`${firstName || ""} ${lastName || ""}`}
                    onError={() => setImageSrc(defaultImage)}
                  />

                  <div
                    className={`${classes.idCategory} ${classes[cardClass]}`}
                  >
                    {cardType}
                  </div>
                </div>
              </div>

              <div className={classes.textGroup}>
                <div className={classes.offsetBackground} />

                <div className={classes.textContent}>
                  <div className={classes.textContentInner}>
                    {fullName && (
                      <Typography className={classes.tcH2} component="h2">
                        {`${fullName || ""}`}
                      </Typography>
                    )}
                    {studentId && (
                      <Typography className={classes.textCode}>
                        {`ID# ${studentId}`}
                      </Typography>
                    )}

                    <div className={classes.barcodeContainer}>
                      <svg id="barcode" className={classes.barcode}></svg>
                    </div>

                    {/*
                    <Typography className={classes.issuedDate}>
                      Issued: 03/22/2021
                    </Typography>
                    */}
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.logosGroup}>
              <div className={classes.logos}>
                <img
                  className={classes.logosImg}
                  src="https://www.broward.edu/_global/images/bc_logo_white.png"
                  alt="Broward College"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withIntl(
  withStyles(IDPage, styles, {
    name: "index",
  }),
);
