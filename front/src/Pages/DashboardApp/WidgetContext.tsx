import React from 'react';

interface Widget {
    id: number;
    title: string;
    data?: any;
}

interface WidgetContextType {
    widgetList: Widget[];
    setWidgetList: React.Dispatch<React.SetStateAction<Widget[]>>;
}

export const WidgetContext = React.createContext<WidgetContextType>({ widgetList: [], setWidgetList: () => {} });
