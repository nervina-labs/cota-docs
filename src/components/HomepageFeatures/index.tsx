import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import {useColorMode} from "@docusaurus/theme-common";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  imageUrl?: string;
  description: JSX.Element;
  link: string;
};

const featureList = (isDarkTheme = false): FeatureItem[] => [
  {
    title: "Token City",
    Svg: isDarkTheme ? require("@site/static/img/token_city.svg").default : require("@site/static/img/token_city.svg").default,
    description: <>View and manage your NFTs anytime, anywhere</>,
    link: "https://token.city",
  },
  {
    title: "Cluster3",
    Svg: require("@site/static/img/cluster3.svg").default,
    description: <>Serving Creative Communities</>,
    link: "https://home.cluster3.me/",
  },
  {
    title: "Rostra",
    imageUrl: require("@site/static/img/rostra.png").default,
    description: <>Build your web3 community with CoTA NFT</>,
    link: "https://rostra.xyz/",
  },
  {
    title: "未物主义-Futurism",
    imageUrl: require("@site/static/img/futurism.png").default,
    description: <>An ecological digital collection platform of "interactive group governance"</>,
    link: "http://m.wwzy.club/",
  },
  {
    title: "CoTA NFT Telegram Bot",
    imageUrl: require("@site/static/img/rostra.png").default,
    description: <>A gate keeper of telegram group</>,
    link: "https://github.com/LoopDAO/ckb-nft-telegram-bot",
  },
  {
    title: "CoTA NFT Discord Bot",
    imageUrl: require("@site/static/img/rostra.png").default,
    description: <>A gate keeper of discord</>,
    link: "https://github.com/LoopDAO/ckb-nft-discord-bot",
  },
];

function Feature({title, Svg, imageUrl, description, link}: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <a className={clsx("text--center", styles.featureLink)} href={link} target="blank">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {imageUrl && <img className={styles.featureImg} src={imageUrl} />}
      </a>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const {isDarkTheme} = useColorMode();
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featureList(isDarkTheme).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
