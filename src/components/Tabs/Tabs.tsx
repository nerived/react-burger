import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { TABS, TYPE_TO_NAME } from "../../types";

import styles from "./Tabs.module.css";

export type TabsProps = {
  current: string;
  setCurrent: (tab: string) => void;
};

export const Tabs = ({ current, setCurrent }: TabsProps) => {
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
