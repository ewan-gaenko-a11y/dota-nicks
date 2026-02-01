import { PageShell } from "@/components/PageShell";
import { Panel } from "@/components/Panel";
import { NicknameInfoModal } from "@/components/NicknameInfoModal";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FormEvent, useState } from "react";

type Nickname = {
    comment: string | null,
    created_at: string,
    id: number,
    nickname: string,
    updated_at: string,
};

type PageProps = {
    nicknames: {
        data: Nickname[],
        current_page: number;
        per_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    },
    pagination: {
        last_page: number;
        current_page_url: string;
    };
    filters: {
        q: string | null;
    };
};

export default function leaderboard() {
    const { nicknames, filters, pagination } = usePage<PageProps>().props;
    const [activeNickname, setActiveNickname] = useState<Nickname | null>(null);
    const [searchQuery, setSearchQuery] = useState(filters.q ?? "");

    const offset = (nicknames.current_page - 1) * nicknames.per_page;
    const lastPage = pagination.last_page;
    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedQuery = searchQuery.trim();

        router.get(
            "/leaderboard",
            trimmedQuery ? { q: trimmedQuery } : {},
            {
                replace: true,
                preserveState: true,
            },
        );
    };

    return (
        <>
            <Head title="Лучшее">
                <meta
                    name="description"
                    content="Поиск лучших никнеймов для Dota 2. Здесь вы сможете найти себе псевдоним для доты и не только."
                />
            </Head>
            <PageShell>
                <Panel className="space-y-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-semibold text-white">Посмотреть все</h1>
                            <p className="text-white/70">
                                Сборник хуйни сомнительного качества
                            </p>
                        </div>
                    </div>
                    <form
                        className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            type="text"
                            name="q"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Найти по нику или комменту"
                            className="h-11 w-full rounded-xl border border-white/10 bg-black/50 px-4 text-sm text-white/90 placeholder:text-white/40 focus:border-red-500/60 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-black/60 px-5 text-lg text-white/80 transition hover:border-red-500/60 hover:text-white"
                            aria-label="Найти"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <line x1="16.65" y1="16.65" x2="21" y2="21" />
                            </svg>
                        </button>
                    </form>
                </Panel>

                <Panel>
                    <h2 className="sr-only">Список никнеймов</h2>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                        <div className="hidden grid-cols-[64px_1.6fr_1fr_1.2fr] gap-4 border-b border-white/10 bg-black/60 px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-white/60 md:grid">
                            <span>#</span>
                            <span>Ник</span>
                            <span>Комментарий</span>
                            <span className="text-right">Добавлен</span>
                        </div>
                        <div className="divide-y divide-white/10">
                            {nicknames.data.length === 0 ? (
                                <div className="px-4 py-10 text-center text-sm text-white/60 md:px-5">
                                    {filters.q
                                        ? "Ничего не найдено по вашему запросу."
                                        : "Пока нет подтвержденных никнеймов."}
                                </div>
                            ) : (
                                nicknames.data.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="grid cursor-pointer grid-cols-1 gap-3 px-4 py-4 text-sm text-white/90 transition hover:bg-white/5 md:grid-cols-[64px_1.6fr_1fr_1.2fr] md:items-center md:gap-4 md:px-5"
                                        onClick={() => setActiveNickname(item)}
                                    >
                                        <div className="flex items-center gap-3 md:contents">
                                            <div className="text-xs font-semibold text-red-400">{offset + index + 1}.</div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-base font-semibold text-white">{item.nickname}</span>
                                                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                                                    ID #{item.id}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            {item.comment ? (
                                                <span className="inline-flex max-w-full truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
                                                    {item.comment}
                                                </span>
                                            ) : (
                                                <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                                                    Без комментария
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.3em] text-white/60 md:text-right">
                                            {(new Date(item.created_at)).toLocaleDateString('ru-RU')}
                                            {" "}
                                            {(new Date(item.created_at)).toLocaleTimeString('ru-RU')}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {lastPage > 1 && (
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                            {nicknames.prev_page_url ? (
                                <Link
                                    href={nicknames.prev_page_url}
                                    className="rounded-md border border-white/20 bg-black/60 px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:border-red-500/60 hover:text-white"
                                >
                                    «
                                </Link>
                            ) : (
                                <span className="rounded-md border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-widest text-white/40">
                                    «
                                </span>
                            )}
                            <Link
                                href={pagination.current_page_url}
                                className="rounded-md border border-red-500/60 bg-red-900/40 px-3 py-2 text-xs uppercase tracking-widest text-white"
                            >
                                {nicknames.current_page}/
                                {lastPage}
                             </Link>
                            {nicknames.next_page_url ? (
                                <Link
                                    href={nicknames.next_page_url}
                                    className="rounded-md border border-white/20 bg-black/60 px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:border-red-500/60 hover:text-white"
                                >
                                    »
                                </Link>
                            ) : (
                                <span className="rounded-md border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-widest text-white/40">
                                    »
                                </span>
                            )}
                        </div>
                    )}
                </Panel >
                <NicknameInfoModal
                    isOpen={Boolean(activeNickname)}
                    nickname={activeNickname}
                    onClose={() => setActiveNickname(null)}
                />
            </PageShell >
        </>
    )
}
