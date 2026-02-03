import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';

import { Layout } from '@/components/Layout';
import { Panel } from '@/components/Panel';

type PageProps = {
    auth: { user: { name?: string } | null };
    quote?: { message: string; author: string };
};

type SuggestionForm = {
    nickname: string;
    comment: string;
};

export default function NicknameSuggestion() {
    const { auth, quote } = usePage<PageProps>().props;
    const isAuthenticated = Boolean(auth?.user);

    const form = useForm<SuggestionForm>({
        nickname: '',
        comment: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/nicknames', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <>
            <Head title="Предложить ник">
                <meta
                    name="description"
                    content="Предложи новый никнейм для Dota 2 и добавь комментарий. Все заявки проходят модерацию."
                />
            </Head>
            <Layout>
                <Panel className="space-y-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-semibold text-white">Предложи ник</h1>
                            <p className="text-white/70">
                                Обращение будет рассмотрено в течение хз крч ниче не обещаю
                            </p>
                        </div>
                    </div>
                </Panel>

                <section>
                    <Panel className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-sm uppercase text-white/60">форма</h2>
                                <h3 className="text-2xl font-semibold text-white">Создай заявку</h3>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={submit}>
                            <div className="space-y-2">
                                <label className="text-xs uppercase text-white/60">Ник</label>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={form.data.nickname}
                                    onChange={(event) => form.setData('nickname', event.target.value)}
                                    className="w-full rounded-md border border-white/40 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                                    placeholder="Новый ник"
                                />
                                {form.errors.nickname && (
                                    <p className="text-xs uppercase tracking-widest text-red-400">
                                        {form.errors.nickname}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase text-white/60">Комментарий (опционально)</label>
                                <input
                                    type="text"
                                    name="comment"
                                    value={form.data.comment}
                                    onChange={(event) => form.setData('comment', event.target.value)}
                                    className="w-full rounded-md border border-white/40 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
                                    placeholder="Любая ремарка по нику"
                                />
                                {form.errors.comment && (
                                    <p className="text-xs uppercase tracking-widest text-red-400">{form.errors.comment}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="w-full rounded-md bg-gradient-to-r from-red-700 to-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:from-red-600 hover:to-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Отправить ник
                            </button>
                            {form.recentlySuccessful && (
                                <p className="text-xs uppercase tracking-widest text-green-400">Ник отправлен</p>
                            )}
                        </form>
                    </Panel>
                </section>
            </Layout>
        </>
    );
}
