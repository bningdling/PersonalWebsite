import { Menu } from 'antd';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import { MenuOutlined } from '@ant-design/icons';
import type { Config, PageInfo } from '@/config.d';

export const DEFAULT_CONFIG = {
    title: '',
    icon: '',
    footer: '',
    pages: [],
    styles: {
        title: {},
        footer: {},
        home: {
            photo: {},
            title: {},
            description: {},
            welcome: {},
            content: {},
        },
        research: {
            title: {},
            card: {
                title: {},
                subTitle: {},
                description: {},
                picture: {},
                buttons: {},
            },
        },
    },
};

const GlobalContext = createContext(DEFAULT_CONFIG as Config);
const { SubMenu } = Menu;

export const useConfigStyle = () => {
    const config = useContext(GlobalContext);
    return config.styles;
};

export const usePageInfo = () => {
    const config = useContext(GlobalContext);
    const pageInfo =
        config.pages.find((item) => item.target === history.location.pathname)?.info ?? {};
    return pageInfo as PageInfo;
};

export default ({ children }: { children: React.FC }) => {
    const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
    useEffect(() => {
        fetch(`./config.json?t=${Date.now()}`)
            .then((res) => res.json())
            .then((res) => {
                setConfig(res);
                document.title = res.title;
                const link = document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = res.icon;
                document.getElementsByTagName('head')[0].appendChild(link);
            });
    }, []);

    const handleClick = useCallback(({ key: target }) => {
        if (['/', '/research'].includes(target)) {
            history.push(target);
        } else if (target) {
            window.open(target, '_blank');
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <header>
                <a href="/">
                    <h1 style={config.styles.title}>{config.title}</h1>
                </a>
                <Menu
                    mode="horizontal"
                    selectedKeys={[history.location.pathname]}
                    onClick={handleClick}
                    className={styles.menu1}
                >
                    {config.pages.map(({ title, target }) => (
                        <Menu.Item key={target}>{title}</Menu.Item>
                    ))}
                </Menu>
                <Menu
                    mode="horizontal"
                    selectedKeys={[]}
                    onClick={handleClick}
                    className={styles.menu2}
                >
                    <SubMenu title={<MenuOutlined className={styles.expend} />}>
                        {config.pages.map(({ title, target }) => (
                            <Menu.Item key={target}>{title}</Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </header>
            <GlobalContext.Provider value={config}>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>{children}</div>
                    <footer style={config.styles.footer}>{config.footer}</footer>
                </div>
            </GlobalContext.Provider>
        </div>
    );
};
