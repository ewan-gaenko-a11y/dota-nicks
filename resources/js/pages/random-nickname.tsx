import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { PageShell } from '../components/PageShell';
import { Panel } from '../components/Panel';
import { NicknameInfoModal } from '../components/NicknameInfoModal';

type RandomNickname = {
    id: number;
    nickname: string;
    comment: string | null;
    created_at: string | null;
};

type PageProps = {
    nickname: RandomNickname | null;
};

export default function RandomNickname() {
    const { nickname } = usePage<PageProps>().props;
    const [isLoading, setIsLoading] = useState(false);
    const [activeNickname, setActiveNickname] = useState<RandomNickname | null>(null);

    const fetchRandom = () => {
        if (isLoading) return;
        setIsLoading(true);
        router.get('/random', {}, {
            preserveScroll: true,
            replace: true,
            onFinish: () => {
                setIsLoading(false);
                setActiveNickname(null);
            },
        });
    };

    return (
        <>
            <Head title="Случайный ник">
                <meta
                    name="description"
                    content="Получи случайный ник для Dota 2, или предложи свой вариант. На сайте никнеймы для доты или для какой игры вам там надо."
                />
            </Head>
            <PageShell>
                <Panel className="space-y-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-semibold text-white">Случайный ник</h1>
                            <p className="text-white/70">
                                Нужен новый ник для доты? Жми кнопку!
                            </p>
                        </div>
                        <div className="flex flex-col items-stretch gap-3 text-center sm:flex-row sm:text-left sm:items-center">
                            <button
                                type="button"
                                onClick={fetchRandom}
                                disabled={isLoading}
                                className="rounded-full border border-red-500/60 bg-red-900/40 px-5 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:-translate-y-0.5 hover:border-red-400/80 hover:bg-red-800/50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? 'Ищу...' : 'Новый ник'}
                            </button>
                            <Link
                                href="/suggest"
                                className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:border-red-400/60 hover:text-white"
                            >
                                Предложить свой
                            </Link>
                        </div>
                    </div>
                </Panel>

                <Panel className="space-y-6">
                    {nickname ? (
                        <div className="space-y-4">
                            <h2 className="text-xs uppercase tracking-[0.35em] text-white/50">результат</h2>
                            <div
                                className="cursor-pointer rounded-2xl border border-white/10 bg-black/40 px-6 py-6 transition hover:border-red-400/40"
                                onClick={() => setActiveNickname(nickname)}
                            >
                                <div className="text-3xl font-semibold text-white sm:text-4xl">
                                    {nickname.nickname}
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                                        ID #{nickname.id}
                                    </span>
                                    {nickname.comment ? (
                                        <span className="max-w-[260px] truncate rounded-full border border-white/15 bg-white/5 px-3 py-1">
                                            {nickname.comment}
                                        </span>
                                    ) : (
                                        <span className="text-white/40">Без комментария</span>
                                    )}
                                    {nickname.created_at && (
                                        <span className="text-white/40">
                                            {new Date(nickname.created_at).toLocaleString('ru-RU')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 text-white/70">
                            <p>В базе пока нет никнеймов.</p>
                            <Link
                                href="/suggest"
                                className="inline-flex rounded-full border border-red-500/60 bg-red-900/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:border-red-400/80 hover:bg-red-800/40"
                            >
                                Добавить первый
                            </Link>
                        </div>
                    )}
                </Panel>
            </PageShell>
            <NicknameInfoModal
                isOpen={Boolean(activeNickname)}
                nickname={activeNickname}
                onClose={() => setActiveNickname(null)}
            />
        </>
    );
}
