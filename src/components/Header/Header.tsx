import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.background}>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <div className={styles.wrapper}>
              <h1 className={styles.logo}>
                netflix
                <span>roulette</span>
              </h1>
              <button
                type="button"
                className={styles.button__add}
                name="btn-add"
              >
                + add movie
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
