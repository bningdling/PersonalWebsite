export type PageInfo = {
    photo?: string;
    title: string;
    description?: string;
    welcome?: string;
    content?: string[];
    cardRowCount?: number;
    width?: number;
    cards?: {
        title: string;
        subTitle: string;
        description: string;
        picture?: string;
        buttons: { title: string; target: string }[];
        category: string[];
    }[];
};

export type Config = {
    title: string;
    icon: string;
    footer: string;
    pages: {
        title: string;
        target: string;
        info?: PageInfo;
    }[];
    styles: {
        title: React.CSSProperties;
        footer: React.CSSProperties;
        home: {
            photo: React.CSSProperties;
            title: React.CSSProperties;
            description: React.CSSProperties;
            welcome: React.CSSProperties;
            content: React.CSSProperties;
        };
        research: {
            title: React.CSSProperties;
            card: {
                title: React.CSSProperties;
                subTitle: React.CSSProperties;
                picture: React.CSSProperties;
                description: React.CSSProperties;
                buttons: React.CSSProperties;
            };
        };
    };
};
