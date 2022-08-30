import { useConfigStyle, usePageInfo } from '@/layout/BasicLayout';
import { Button, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import type { CardType, StyleConfig, PageInfo } from '@/config.d';

const { TabPane } = Tabs;

interface CardProps extends CardType {
    width: number;
    pageInfo: PageInfo;
    index: number;
    configStyle: StyleConfig;
}

const Card = ({
    title,
    subTitle,
    description,
    buttons,
    picture,
    shortDescription,
    width,
    pageInfo,
    index,
    configStyle,
}: CardProps) => {
    const cardStyle = useMemo(() => {
        const count = width < 600 ? 1 : pageInfo.cardRowCount || 1;
        const res: React.CSSProperties = {
            maxWidth: `calc(${100 / count}vw - ${62 / count}px - 18px)`,
        };
        if (pageInfo.width) {
            res.width = `calc(${pageInfo.width / count}px - ${62 / count}px - 18px)`;
        }
        if (index % count === 0) {
            res.marginLeft = '40px';
        }
        if ((index + 1) % count === 0) {
            res.marginRight = '40px';
        }
        return res;
    }, [index, pageInfo, width]);

    const showToggleBtn = useMemo(() => !!shortDescription, [shortDescription]);
    const [isShort, setIsShort] = useState(!!shortDescription);

    return (
        <div className={styles.card} style={cardStyle}>
            <div style={configStyle.research.card.title} className={styles.title}>
                {title}
            </div>
            <div style={configStyle.research.card.subTitle} className={styles.subTitle}>
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
                {isShort ? shortDescription : description}
                {showToggleBtn && (
                    <span className={styles.moreBtn} onClick={() => setIsShort(!isShort)}>
                        {isShort ? 'More' : 'Less'}
                    </span>
                )}
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
    );
};

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
                            ?.map((item, index: number) => (
                                <Card
                                    {...item}
                                    index={index}
                                    key={index}
                                    pageInfo={pageInfo}
                                    configStyle={configStyle}
                                    width={width}
                                />
                            ))}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};
