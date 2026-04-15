import {useMemo} from 'react';
import {LayoutData} from "../interface/Layout.props";
import {buildLayoutProps} from "../lib/buildLayoutProps";

export const useLayoutProps = (data: LayoutData) => {
    return useMemo(() => buildLayoutProps(data), [data]);
};
