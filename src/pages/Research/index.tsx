import { useConfigStyle, usePageInfo } from '@/layout/BasicLayout';
import { Button, Tabs } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';

const { TabPane } = Tabs;

export default () => {
    const pageInfo = usePageInfo();
    const configStyle = useConfigStyle();
    const allCategory = useMemo(() => {
        const result: string[] = ['All'];
        pageInfo.cards?.forEach(({ category }: { category: string[] }) => {
            category?.forEach((c) => {
                if (!result.includes(c)) {
                    result.push(c);
                }
            });
        });
        return result;
    }, [pageInfo.cards]);

    const [activeKey, setActiveKey] = useState('All');
    const [width, setWidth] = useState(document.documentElement.clientWidth);
    useEffect(() => {
        const resizeHandler = () => {
            setWidth(document.documentElement.clientWidth);
        };
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const getCardStyle = useCallback(
        (index: number) => {
            const count = width < 600 ? 1 : pageInfo.cardRowCount || 1;
            const res: React.CSSProperties = {
                maxWidth: `calc(${100 / count}vw - ${80 / count}px - 9px)`,
            };
            if (pageInfo.width) {
                res.width = `calc(${pageInfo.width / count}px - ${80 / count}px - 9px)`;
            }
            if (index % count === 0) {
                res.marginLeft = '40px';
            }
            if ((index + 1) % count === 0) {
                res.marginRight = '40px';
            }
            return res;
        },
        [pageInfo, width],
    );

    const wrapperStyle = useMemo(
        () => (pageInfo?.width ? { width: `${pageInfo.width}px` } : {}),
        [pageInfo],
    );

    return (
        <div className={styles.wrapper} style={wrapperStyle}>
            <h2 style={configStyle.research.title}>{pageInfo.title}</h2>
            <Tabs activeKey={activeKey} onChange={setActiveKey}>
                {allCategory.map((c) => (
                    <TabPane tab={c} key={c}>
                        {pageInfo.cards
                            ?.filter((card) => (c === 'All' ? true : card.category?.includes(c)))
                            ?.map(
                                (
                                    { title, subTitle, description, buttons, picture },
                                    index: number,
                                ) => (
                                    <div
                                        className={styles.card}
                                        key={index}
                                        style={getCardStyle(index)}
                                    >
                                        <div
                                            style={configStyle.research.card.title}
                                            className={styles.title}
                                        >
                                            {title}
                                        </div>
                                        <div
                                            style={configStyle.research.card.subTitle}
                                            className={styles.subTitle}
                                        >
                                            {subTitle}
                                        </div>
                                        {picture && (
                                            <div
                                                style={{
                                                    ...configStyle.research.card.picture,
                                                    backgroundImage: `url(${picture})`,
                                                }}
                                                className={styles.picture}
                                            />
                                        )}
                                        <p style={configStyle.research.card.description}>
                                            {description}
                                        </p>
                                        {buttons?.map((btn, btnIndex: number) => (
                                            <Button
                                                key={btnIndex}
                                                ghost
                                                type="primary"
                                                onClick={() => {
                                                    window.open(btn.target, '_blank');
                                                }}
                                                style={configStyle.research.card.buttons}
                                            >
                                                {btn.title}
                                            </Button>
                                        ))}
                                    </div>
                                ),
                            )}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};
