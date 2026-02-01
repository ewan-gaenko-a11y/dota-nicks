import { Head, Link, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
    redirect: string | null;
};

export default function Login() {
    const { redirect } = usePage<{ redirect?: string | null }>().props;
    const form = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
        redirect: redirect ?? null,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/login', {
            onFinish: () => form.reset('password'),
        });
    };

    return (
        <>
            <Head title="Войти" />
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="w-full max-w-md rounded-lg border border-white/20 bg-black/80 p-8 shadow-2xl">
                    <div className="mb-6 text-center">
                        <h1 className="mt-2 text-3xl font-semibold text-white">Войти</h1>
                    </div>
                    <h2 className="sr-only">Форма входа</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-xs uppercase text-white/60">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.data.email}
                                onChange={(event) => form.setData('email', event.target.value)}
                                className="mt-2 w-full rounded-md border border-white/30 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                            />
                            {form.errors.email && (
                                <p className="mt-1 text-xs uppercase tracking-widest text-red-400">{form.errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs uppercase text-white/60">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                                className="mt-2 w-full rounded-md border border-white/30 bg-black/50 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                            />
                            {form.errors.password && (
                                <p className="mt-1 text-xs uppercase tracking-widest text-red-400">
                                    {form.errors.password}
                                </p>
                            )}
                        </div>
                        <label className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                            <input
                                type="checkbox"
                                checked={form.data.remember}
                                onChange={(event) => form.setData('remember', event.target.checked)}
                                className="rounded border-white/40 bg-transparent text-red-500 focus:ring-red-500"
                            />
                            Запомнить
                        </label>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-md bg-gradient-to-r from-red-700 to-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:from-red-600 hover:to-red-400 disabled:opacity-60"
                        >
                            Войти
                        </button>
                    </form>
                    <div className="mt-6 space-y-2 text-center text-sm text-white/60">
                        <p>
                            Доступ только для админа. Если нужен доступ — свяжись с владельцем.
                        </p>
                        <Link href="/" className="text-red-400 underline-offset-4 hover:text-red-300">
                            ← Вернуться к никам
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
