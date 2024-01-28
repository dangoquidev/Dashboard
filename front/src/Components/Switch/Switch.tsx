import React from 'react';
import { Switch } from '@nextui-org/react';
import { MoonIcon } from '../../Icons/Moon';
import { SunIcon } from '../../Icons/Sun';
import { useTheme } from 'next-themes';

export const SwitchTheme = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Switch
        defaultSelected={theme === 'dark'}
        size='lg'
        color='default'
        onChange={toggleTheme}
        thumbIcon={({ isSelected, className }) =>
            isSelected ? (
                <MoonIcon className={className} />
            ) : (
                <SunIcon className={className} />
            )
        }
        ></Switch>
    );
};
