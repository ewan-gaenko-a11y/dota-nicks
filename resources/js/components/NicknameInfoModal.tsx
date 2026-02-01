import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

type NicknameInfo = {
    id: number;
    nickname: string;
    comment: string | null;
    created_at?: string | null;
};

type NicknameInfoModalProps = {
    isOpen: boolean;
    nickname: NicknameInfo | null;
    onClose: () => void;
    footer?: ReactNode;
};

export function NicknameInfoModal({ isOpen, nickname, onClose, footer }: NicknameInfoModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [displayNickname, setDisplayNickname] = useState<NicknameInfo | null>(null);

    useEffect(() => {
        if (isOpen && nickname) {
            setDisplayNickname(nickname);
            setIsVisible(true);
            setIsActive(false);
            return undefined;
        }

        if (!isVisible) {
            return undefined;
        }

        setIsActive(false);
        const timeoutId = window.setTimeout(() => {
            setIsVisible(false);
            setDisplayNickname(null);
        }, 200);

        return () => window.clearTimeout(timeoutId);
    }, [isOpen, nickname, isVisible]);

    useEffect(() => {
        if (!isVisible) {
            return undefined;
        }

        const frameId = window.requestAnimationFrame(() => {
            setIsActive(true);
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [isVisible]);

    if (!isVisible || !displayNickname) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-opacity duration-200 ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80" />
            <div
                className={`relative w-full max-w-xl rounded-2xl border border-white/10 bg-black/90 p-6 shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-transform duration-200 ${
                    isActive ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Инфо по нику</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{displayNickname.nickname}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/70 transition hover:border-red-400/60 hover:text-white"
                    >
                        Закрыть
                    </button>
                </div>

                <div className="mt-5 space-y-4 text-sm text-white/80">
                    <div className="rounded-lg border border-white/10 bg-black/60 p-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Комментарий</p>
                        <p className="mt-2 break-words text-white/90">
                            {displayNickname.comment ?? 'Без комментария'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                            ID #{displayNickname.id}
                        </span>
                        {displayNickname.created_at && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                {new Date(displayNickname.created_at).toLocaleString('ru-RU')}
                            </span>
                        )}
                    </div>
                </div>

                {footer && <div className="mt-5">{footer}</div>}
            </div>
        </div>
    );
}
