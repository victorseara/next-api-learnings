import styles from './api.module.css';

/* eslint-disable-next-line */
export interface ApiProps {}

export function Api(props: ApiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Api!</h1>
    </div>
  );
}

export default Api;
