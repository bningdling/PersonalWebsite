import { useConfigStyle, usePageInfo } from '@/layout/BasicLayout';
import styles from './index.less';

export default () => {
    const pageInfo = usePageInfo();
    const configStyle = useConfigStyle();
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div
                    className={styles.img}
                    style={{ backgroundImage: `url(${pageInfo.photo})`, ...configStyle.home.photo }}
                />
                <h2 style={configStyle.home.title}>{pageInfo.title}</h2>
                <p style={configStyle.home.description}>{pageInfo.description}</p>
            </div>
            <div className={styles.description}>
                <h2 style={configStyle.home.welcome}>{pageInfo.welcome}</h2>
                {pageInfo.content?.map((str: string, index: number) => (
                    <p style={configStyle.home.content} key={index}>
                        {str}
                    </p>
                ))}
            </div>
        </div>
    );
};
