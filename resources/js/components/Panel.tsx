import type { PropsWithChildren } from 'react';

import { cn } from '../lib/utils';

export const panelBase =
    'rounded-lg border border-white/20 border-b-4 border-b-red-600 bg-black/70 px-6 py-6 shadow-[0_0_25px_rgba(255,255,255,0.08)] backdrop-blur';

type PanelProps = PropsWithChildren<{
    className?: string;
}>;

export function Panel({ children, className }: PanelProps) {
    return <div className={cn(panelBase, className)}>{children}</div>;
}
