import type { PropsWithChildren } from "preact/compat";
import styles from "./Tech.module.scss";

export const Tech = (props: PropsWithChildren) => <li className={styles.stack}>{props.children}</li>;
