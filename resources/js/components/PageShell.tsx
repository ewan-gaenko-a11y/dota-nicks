import { Link, router, usePage } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { cn } from '../lib/utils';
import { twMerge } from 'tailwind-merge';

type PageShellProps = PropsWithChildren<{
    tag?: string;
    rightSlot?: ReactNode;
    mainClassName?: string;
}>;

const navigationLinks = [
    {
        href: "/",
        name: 'Случайный',
    },
    {
        href: "/suggest",
        name: 'Предложить',
    },
    {
        href: "/leaderboard",
        name: 'Просмотр',
    },
];

export function PageShell({ rightSlot, mainClassName, children }: PageShellProps) {
    const { url, props } = usePage();
    const user = (props as { auth?: { user?: { name?: string } | null } })?.auth?.user;
    const links = user
        ? [...navigationLinks, { href: "/admin", name: "Админ" }]
        : navigationLinks;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

    const openMobileMenu = () => {
        if (isMobileMenuVisible) {
            return;
        }
        setIsMobileMenuVisible(true);
        window.requestAnimationFrame(() => {
            setIsMobileMenuOpen(true);
        });
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        if (isMobileMenuVisible) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
        document.body.style.overflow = '';
        return undefined;
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!isMobileMenuVisible || isMobileMenuOpen) {
            return undefined;
        }
        const timeoutId = window.setTimeout(() => {
            setIsMobileMenuVisible(false);
        }, 200);

        return () => window.clearTimeout(timeoutId);
    }, [isMobileMenuOpen, isMobileMenuVisible]);

    return (
        <div
            className="relative flex min-h-screen flex-col bg-black text-white"
            style={{ fontFamily: '"Chakra Petch", "Instrument Sans", sans-serif' }}
        >
            <div className="pointer-events-none absolute inset-0 opacity-50">
                <div className="absolute -top-12 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-900/40 blur-3xl" />
            </div>

            <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="text-[10px] uppercase tracking-[0.35em] text-white/60 sm:text-xs sm:tracking-[0.5em]">
                                Dota Nick Hub
                            </span>
                            <div className="hidden flex-wrap items-center gap-2 sm:flex sm:gap-3">
                                {links.map(link => {
                                    const isActive = link.href === '/'
                                        ? url === '/' || url.startsWith('/random')
                                        : url.startsWith(link.href);

                                    return (
                                        <Link
                                            href={link.href}
                                            key={link.href}
                                            className={
                                                twMerge(
                                                    "rounded-full border border-gray-700/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-red-100 transition duration-200 hover:-translate-y-0.5 hover:border-red-400/60 hover:text-white sm:tracking-[0.35em]",
                                                    isActive && "border-red-500/70 bg-red-800/40 text-white shadow-[0_0_18px_rgba(220,38,38,0.35)]"
                                                )
                                            }
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:self-auto">
                            {user && (
                                <button
                                    type="button"
                                    onClick={() => router.post('/logout')}
                                    className="hidden rounded-full border border-red-500/40 bg-red-900/30 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-red-400/80 hover:bg-red-800/40 sm:inline-flex"
                                >
                                    Выйти
                                </button>
                            )}
                            {rightSlot}
                            <button
                                type="button"
                                onClick={() => {
                                    if (isMobileMenuVisible) {
                                        closeMobileMenu();
                                    } else {
                                        openMobileMenu();
                                    }
                                }}
                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/60 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 transition duration-200 hover:border-red-500/60 hover:text-white sm:hidden"
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Открыть меню"
                            >
                                <span className="flex h-3 w-4 flex-col justify-between">
                                    <span className="h-0.5 w-full rounded bg-current" />
                                    <span className="h-0.5 w-full rounded bg-current" />
                                    <span className="h-0.5 w-full rounded bg-current" />
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </nav>

            <main className={cn('relative z-10 mx-auto w-full max-w-6xl flex-1 space-y-10 px-6 py-12', mainClassName)}>
                {children}
            </main>

            <footer className="relative z-10 border-t border-white/10 px-6 py-3">
                <div className="mx-auto max-w-6xl text-center text-xs uppercase tracking-[0.4em] text-white/50">
                    @EBALOLOMATEL9000
                </div>
            </footer>

            {isMobileMenuVisible && (
                <div
                    className={cn(
                        "fixed inset-0 z-30 transition-opacity duration-200 sm:hidden",
                        isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                >
                    <button
                        type="button"
                        className={cn(
                            "absolute inset-0 bg-black/70 transition-opacity duration-200",
                            isMobileMenuOpen ? "opacity-100" : "opacity-0",
                        )}
                        onClick={closeMobileMenu}
                        aria-label="Закрыть меню"
                    />
                    <div
                        className={cn(
                            "absolute right-0 top-0 h-full w-64 overflow-y-auto border-l border-white/10 bg-black/95 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.45)] backdrop-blur transition-transform duration-200",
                            isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
                        )}
                    >
                        <div className="flex flex-col gap-2">
                            {links.map(link => {
                                const isActive = link.href === '/'
                                    ? url === '/' || url.startsWith('/random')
                                    : url.startsWith(link.href);

                                return (
                                    <Link
                                        href={link.href}
                                        key={link.href}
                                        className={
                                            twMerge(
                                                "rounded-full border border-gray-700/60 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-red-100 transition duration-200 hover:-translate-y-0.5 hover:border-red-400/60 hover:text-white",
                                                isActive && "border-red-500/70 bg-red-800/40 text-white shadow-[0_0_18px_rgba(220,38,38,0.35)]"
                                            )
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            {user && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMobileMenu();
                                        router.post('/logout');
                                    }}
                                    className="rounded-full border border-red-500/40 bg-red-900/30 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white transition duration-200 hover:-translate-y-0.5 hover:border-red-400/80 hover:bg-red-800/40"
                                >
                                    Выйти
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
