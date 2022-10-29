import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/protocols/cota_main">
            Protocols
          </Link>

          <span className={styles.divider} />

          <Link className="button button--secondary button--lg" to="/docs/getting-started/overview">
            Tutorial
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Home" description="The docs of CoTA protocol for NFTs and FTs ">
      <HomepageHeader />
      <main>
        {/* <div className={styles.appTitle}>CoTA Applications</div> */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
