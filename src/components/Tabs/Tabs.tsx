import { useState } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { TABS, TYPE_TO_NAME } from "../../utils";

import styles from "./Tabs.module.css";

export const Tabs = () => {
  const [current, setCurrent] = useState<string>(TABS[0]);
  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => {
        return (
          <Tab
            key={tab}
            value={tab}
            active={current === tab}
            onClick={setCurrent}
          >
            {TYPE_TO_NAME[tab]}
          </Tab>
        );
      })}
    </div>
  );
};

export default Tabs;
