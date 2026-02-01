import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";

import { PageShell } from "@/components/PageShell";
import { Panel } from "@/components/Panel";

type PendingNickname = {
    id: number;
    nickname: string;
    comment: string | null;
    created_at: string | null;
};

type PageProps = {
    pendingNickname: PendingNickname | null;
    pendingCount: number;
};

export default function Admin() {
    const { pendingNickname, pendingCount } = usePage<PageProps>().props;
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = (action: "approve" | "decline") => {
        if (!pendingNickname || isProcessing) return;
        setIsProcessing(true);
        router.post(`/admin/nicknames/${pendingNickname.id}/${action}`, {}, {
            preserveScroll: true,
            onFinish: () => setIsProcessing(false),
        });
    };

    return (
        <>
            <Head title="Админ" />
            <PageShell>
                <Panel className="space-y-3">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold text-white">Панель управления</h1>
                        <h2 className="text-xs uppercase tracking-[0.35em] text-white/50">Admin</h2>
                        <p className="text-white/70">
                            Здесь управление заявками и модерация никнеймов.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="rounded-xl border border-white/10 bg-black/50 p-5">
                            <h3 className="text-xs uppercase tracking-[0.35em] text-white/40">Очередь</h3>
                            <p className="mt-3 text-2xl font-semibold text-white">
                                {pendingCount} заявок
                            </p>
                            <p className="mt-2 text-sm text-white/60">
                                Обрабатывай по одной, просто потому что чебы и нет.
                            </p>
                        </div>
                    </div>
                </Panel>

                <Panel className="space-y-6">
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.35em] text-white/50">На модерации</h3>
                        <h2 className="mt-2 text-2xl font-semibold text-white">Следующая заявка</h2>
                    </div>

                    {pendingNickname ? (
                        <div className="space-y-5">
                            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                                <div className="text-3xl font-semibold text-white">
                                    {pendingNickname.nickname}
                                </div>
                                <div className="mt-3 text-sm text-white/70">
                                    {pendingNickname.comment ?? "Без комментария"}
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                        ID #{pendingNickname.id}
                                    </span>
                                    {pendingNickname.created_at && (
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                            {new Date(pendingNickname.created_at).toLocaleString('ru-RU')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleAction("approve")}
                                    disabled={isProcessing}
                                    className="rounded-full border border-emerald-500/50 bg-emerald-900/40 px-6 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:-translate-y-0.5 hover:border-emerald-400/70 hover:bg-emerald-800/50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Одобрить
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleAction("decline")}
                                    disabled={isProcessing}
                                    className="rounded-full border border-red-500/60 bg-red-900/40 px-6 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:-translate-y-0.5 hover:border-red-400/80 hover:bg-red-800/50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Отклонить
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-white/20 bg-black/40 px-6 py-10 text-center text-sm text-white/60">
                            В очереди нет заявок. Как только появятся новые — они будут здесь.
                        </div>
                    )}
                </Panel>
            </PageShell>
        </>
    );
}
